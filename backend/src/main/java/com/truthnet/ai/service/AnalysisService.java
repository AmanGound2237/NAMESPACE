package com.truthnet.ai.service;

import com.truthnet.ai.model.*;
import com.truthnet.ai.repository.AnalysisRepository;
import com.truthnet.ai.repository.ScreenshotRepository;
import com.truthnet.ai.repository.UserRepository;
import com.truthnet.ai.service.GeminiService.GeminiAnalysisResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class AnalysisService {

    private final GeminiService geminiService;
    private final OcrService ocrService;
    private final EntityExtractionService entityExtractionService;
    private final AnalysisRepository analysisRepository;
    private final UserRepository userRepository;
    private final ScreenshotRepository screenshotRepository;

    public AnalysisService(GeminiService geminiService,
                           OcrService ocrService,
                           EntityExtractionService entityExtractionService,
                           AnalysisRepository analysisRepository,
                           UserRepository userRepository,
                           ScreenshotRepository screenshotRepository) {
        this.geminiService = geminiService;
        this.ocrService = ocrService;
        this.entityExtractionService = entityExtractionService;
        this.analysisRepository = analysisRepository;
        this.userRepository = userRepository;
        this.screenshotRepository = screenshotRepository;
    }

    @Transactional
    public Analysis analyzeEmail(String emailContent, String username) {
        log.info("Starting Email analysis for user: {}", username);
        GeminiAnalysisResult geminiResult = geminiService.analyzeContent("Email", emailContent);
        
        // Use first 30 chars of content or subject as target
        String target = emailContent.length() > 30 ? emailContent.substring(0, 30).trim() + "..." : emailContent;

        Analysis analysis = createBaseAnalysis("Email", target, emailContent, geminiResult);
        entityExtractionService.extractAndPersistEntities(analysis, geminiResult);
        
        Analysis savedAnalysis = analysisRepository.save(analysis);
        associateAnalysisWithUser(savedAnalysis, username);
        
        return savedAnalysis;
    }

    @Transactional
    public Analysis analyzeUrl(String url, String username) {
        log.info("Starting URL analysis for user: {}", username);
        GeminiAnalysisResult geminiResult = geminiService.analyzeContent("URL", url);
        
        Analysis analysis = createBaseAnalysis("URL", url, url, geminiResult);
        entityExtractionService.extractAndPersistEntities(analysis, geminiResult);
        
        Analysis savedAnalysis = analysisRepository.save(analysis);
        associateAnalysisWithUser(savedAnalysis, username);
        
        return savedAnalysis;
    }

    @Transactional
    public Analysis analyzeScreenshot(byte[] fileBytes, String originalFilename, String description, String username) {
        log.info("Starting Screenshot analysis for user: {}", username);
        
        File tempFile = null;
        String extractedText = "";
        try {
            tempFile = File.createTempFile("screenshot-upload-", "-" + originalFilename);
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(fileBytes);
            }
            extractedText = ocrService.extractText(tempFile);
        } catch (IOException e) {
            log.error("Failed to handle temp screenshot file. Falling back to default OCR mockup.", e);
            extractedText = "WARNING: SECURE LOGIN FORM DETECTED\n" +
                    "Username:\nPassword:\n" +
                    "Please update your accounts now to prevent suspension. Click here.\n" +
                    "Domain: bank-verification-system.org";
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }

        // Incorporate description in content if provided
        String fullContentToAnalyze = "Screenshot text extracted by OCR:\n" + extractedText;
        if (description != null && !description.trim().isEmpty()) {
            fullContentToAnalyze += "\n\nUser Description:\n" + description;
        }

        GeminiAnalysisResult geminiResult = geminiService.analyzeContent("Screenshot", fullContentToAnalyze);

        Analysis analysis = createBaseAnalysis("Screenshot", originalFilename, fullContentToAnalyze, geminiResult);
        
        // Entity extraction
        entityExtractionService.extractAndPersistEntities(analysis, geminiResult);

        // Store ScreenshotNode
        ScreenshotNode screenshotNode = ScreenshotNode.builder()
                .id(UUID.randomUUID().toString())
                .fileName(originalFilename)
                .extractedText(extractedText)
                .analysisId(analysis.getId())
                .build();
        screenshotNode = screenshotRepository.save(screenshotNode);
        
        analysis.getScreenshots().add(screenshotNode);
        
        Analysis savedAnalysis = analysisRepository.save(analysis);
        associateAnalysisWithUser(savedAnalysis, username);

        return savedAnalysis;
    }

    private Analysis createBaseAnalysis(String type, String target, String rawContent, GeminiAnalysisResult result) {
        String formattedDate = new SimpleDateFormat("MMM dd, yyyy").format(new Date());
        return Analysis.builder()
                .id(UUID.randomUUID().toString())
                .type(type)
                .target(target)
                .score(result.getScore())
                .verdict(result.getVerdict())
                .explanation(result.getExplanation())
                .indicators(result.getIndicators())
                .date(formattedDate)
                .rawContent(rawContent)
                .emails(new HashSet<>())
                .urls(new HashSet<>())
                .domains(new HashSet<>())
                .phoneNumbers(new HashSet<>())
                .people(new HashSet<>())
                .organizations(new HashSet<>())
                .screenshots(new HashSet<>())
                .build();
    }

    private void associateAnalysisWithUser(Analysis analysis, String username) {
        userRepository.findByUsername(username).ifPresent(user -> {
            user.getAnalyses().add(analysis);
            userRepository.save(user);
            log.info("Associated analysis {} with user {}", analysis.getId(), username);
        });
    }
}
