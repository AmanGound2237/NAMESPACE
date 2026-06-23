package com.truthnet.ai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Screenshot")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScreenshotNode {

    @Id
    private String id; // UUID String

    private String fileName;
    private String extractedText;
    private String analysisId;
}
