package com.truthnet.ai.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = GeminiService.class)
@ActiveProfiles("test")
public class GeminiServiceTest {

    @Autowired
    private GeminiService geminiService;

    @Test
    public void testAnalyzeEmailMockFallback() {
        String testContent = "Urgent: Update your bank details by sending email to billing@trust-secure.com";
        GeminiService.GeminiAnalysisResult result = geminiService.analyzeContent("Email", testContent);
        
        assertNotNull(result);
        assertTrue(result.getScore() >= 0 && result.getScore() <= 100);
        assertNotNull(result.getVerdict());
        assertFalse(result.getIndicators().isEmpty());
        assertTrue(result.getEmails().contains("billing@trust-secure.com"));
    }
}
