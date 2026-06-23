package com.truthnet.ai.service;

import com.truthnet.ai.model.*;
import com.truthnet.ai.repository.*;
import com.truthnet.ai.service.GeminiService.GeminiAnalysisResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
public class EntityExtractionService {

    private final EmailRepository emailRepository;
    private final DomainRepository domainRepository;
    private final UrlRepository urlRepository;
    private final PhoneNumberRepository phoneNumberRepository;
    private final PersonRepository personRepository;
    private final OrganizationRepository organizationRepository;

    public EntityExtractionService(EmailRepository emailRepository,
                                    DomainRepository domainRepository,
                                    UrlRepository urlRepository,
                                    PhoneNumberRepository phoneNumberRepository,
                                    PersonRepository personRepository,
                                    OrganizationRepository organizationRepository) {
        this.emailRepository = emailRepository;
        this.domainRepository = domainRepository;
        this.urlRepository = urlRepository;
        this.phoneNumberRepository = phoneNumberRepository;
        this.personRepository = personRepository;
        this.organizationRepository = organizationRepository;
    }

    @Transactional
    public void extractAndPersistEntities(Analysis analysis, GeminiAnalysisResult geminiResult) {
        log.info("Persisting extracted entities for analysis ID: {}", analysis.getId());

        // 1. Persist Organizations
        Set<OrganizationNode> persistedOrgs = new HashSet<>();
        for (String orgName : geminiResult.getOrganizations()) {
            OrganizationNode org = organizationRepository.findById(orgName)
                    .orElseGet(() -> organizationRepository.save(new OrganizationNode(orgName)));
            persistedOrgs.add(org);
        }
        analysis.setOrganizations(persistedOrgs);

        // 2. Persist People
        Set<PersonNode> persistedPeople = new HashSet<>();
        for (String personName : geminiResult.getPeople()) {
            PersonNode person = personRepository.findById(personName)
                    .orElseGet(() -> personRepository.save(new PersonNode(personName)));
            persistedPeople.add(person);
        }
        analysis.setPeople(persistedPeople);

        // 3. Persist Domains (and associate with targets)
        Set<DomainNode> persistedDomains = new HashSet<>();
        for (String domainName : geminiResult.getDomains()) {
            DomainNode domainNode = domainRepository.findById(domainName)
                    .orElseGet(() -> {
                        DomainNode d = DomainNode.builder()
                                .domain(domainName)
                                .targetOrganizations(new HashSet<>())
                                .targetPeople(new HashSet<>())
                                .build();
                        return domainRepository.save(d);
                    });
            
            // Add targeted associations if available
            boolean modified = false;
            if (!persistedOrgs.isEmpty()) {
                domainNode.getTargetOrganizations().addAll(persistedOrgs);
                modified = true;
            }
            if (!persistedPeople.isEmpty()) {
                domainNode.getTargetPeople().addAll(persistedPeople);
                modified = true;
            }
            if (modified) {
                domainNode = domainRepository.save(domainNode);
            }
            persistedDomains.add(domainNode);
        }
        analysis.setDomains(persistedDomains);

        // 4. Persist URLs (and associate with domains)
        Set<UrlNode> persistedUrls = new HashSet<>();
        for (String urlStr : geminiResult.getUrls()) {
            // Find parent domain name from URL
            String parentDomainName = extractDomainFromUrl(urlStr);
            DomainNode parentDomain = null;
            if (parentDomainName != null) {
                parentDomain = domainRepository.findById(parentDomainName)
                        .orElseGet(() -> domainRepository.save(
                                DomainNode.builder().domain(parentDomainName).build()
                        ));
                persistedDomains.add(parentDomain);
            }

            DomainNode finalParentDomain = parentDomain;
            UrlNode urlNode = urlRepository.findById(urlStr)
                    .orElseGet(() -> {
                        UrlNode u = UrlNode.builder()
                                .url(urlStr)
                                .domain(finalParentDomain)
                                .build();
                        return urlRepository.save(u);
                    });
            persistedUrls.add(urlNode);
        }
        analysis.setUrls(persistedUrls);

        // 5. Persist Emails (and associate with domains)
        Set<EmailNode> persistedEmails = new HashSet<>();
        for (String emailStr : geminiResult.getEmails()) {
            EmailNode emailNode = emailRepository.findById(emailStr)
                    .orElseGet(() -> {
                        EmailNode e = EmailNode.builder()
                                .email(emailStr)
                                .domains(new HashSet<>())
                                .build();
                        return emailRepository.save(e);
                    });

            if (!persistedDomains.isEmpty()) {
                emailNode.getDomains().addAll(persistedDomains);
                emailNode = emailRepository.save(emailNode);
            }
            persistedEmails.add(emailNode);
        }
        analysis.setEmails(persistedEmails);

        // 6. Persist Phone Numbers (and associate with orgs & people)
        Set<PhoneNumberNode> persistedPhones = new HashSet<>();
        for (String phoneStr : geminiResult.getPhoneNumbers()) {
            PhoneNumberNode phoneNode = phoneNumberRepository.findById(phoneStr)
                    .orElseGet(() -> {
                        PhoneNumberNode p = PhoneNumberNode.builder()
                                .phoneNumber(phoneStr)
                                .organizations(new HashSet<>())
                                .people(new HashSet<>())
                                .build();
                        return phoneNumberRepository.save(p);
                    });

            boolean modified = false;
            if (!persistedOrgs.isEmpty()) {
                phoneNode.getOrganizations().addAll(persistedOrgs);
                modified = true;
            }
            if (!persistedPeople.isEmpty()) {
                phoneNode.getPeople().addAll(persistedPeople);
                modified = true;
            }
            if (modified) {
                phoneNode = phoneNumberRepository.save(phoneNode);
            }
            persistedPhones.add(phoneNode);
        }
        analysis.setPhoneNumbers(persistedPhones);
    }

    private String extractDomainFromUrl(String urlString) {
        try {
            if (urlString == null) return null;
            String cleanUrl = urlString.trim();
            if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
                cleanUrl = "http://" + cleanUrl;
            }
            URI uri = new URI(cleanUrl);
            String domain = uri.getHost();
            if (domain != null) {
                return domain.startsWith("www.") ? domain.substring(4) : domain;
            }
            return null;
        } catch (Exception e) {
            log.warn("Failed to extract domain from URL: {}", urlString);
            return null;
        }
    }
}
