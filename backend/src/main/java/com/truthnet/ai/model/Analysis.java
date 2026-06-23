package com.truthnet.ai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Node("Analysis")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Analysis {

    @Id
    private String id; // UUID String

    private String type; // Email, URL, Screenshot, Text
    private String target; // The primary content identifier (e.g. email subject, URL host, or image name)
    private int score; // 0-100
    private String verdict; // Critical, High Risk, Elevated, Moderate, Safe
    private String explanation;
    
    @Builder.Default
    private List<String> indicators = new ArrayList<>();
    
    private String date; // Formatted date
    private String rawContent; // Raw content analyzed

    @Relationship(type = "CONTAINS", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<EmailNode> emails = new HashSet<>();

    @Relationship(type = "CONTAINS", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<UrlNode> urls = new HashSet<>();

    @Relationship(type = "CONTAINS", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<DomainNode> domains = new HashSet<>();

    @Relationship(type = "CONTAINS", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<PhoneNumberNode> phoneNumbers = new HashSet<>();

    @Relationship(type = "CONTAINS", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<PersonNode> people = new HashSet<>();

    @Relationship(type = "CONTAINS", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<OrganizationNode> organizations = new HashSet<>();

    @Relationship(type = "CONTAINS", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<ScreenshotNode> screenshots = new HashSet<>();
}
