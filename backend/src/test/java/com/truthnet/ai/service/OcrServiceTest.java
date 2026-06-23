package com.truthnet.ai.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.io.File;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = OcrService.class)
@ActiveProfiles("test")
public class OcrServiceTest {

    @Autowired
    private OcrService ocrService;

    @Test
    public void testExtractTextFallback() {
        // We supply an invalid file path or non-existent file to force fallback behavior
        File dummyFile = new File("non_existent_screenshot.png");
        String result = ocrService.extractText(dummyFile);
        
        assertNotNull(result);
        assertTrue(result.contains("WARNING") || result.contains("SECURE LOGIN"));
    }
}
