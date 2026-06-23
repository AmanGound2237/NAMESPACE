package com.truthnet.ai.controller;

import com.truthnet.ai.dto.AnalysisRequest;
import com.truthnet.ai.model.Analysis;
import com.truthnet.ai.service.AnalysisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/analysis")
@Tag(name = "Analysis Operations", description = "Endpoints for threat analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @PostMapping("/email")
    @Operation(summary = "Analyze email text body or header for scam and phishing")
    public ResponseEntity<Analysis> analyzeEmail(@Valid @RequestBody AnalysisRequest request, Principal principal) {
        String username = principal != null ? principal.getName() : "anonymousUser";
        return ResponseEntity.ok(analysisService.analyzeEmail(request.getContent(), username));
    }

    @PostMapping("/url")
    @Operation(summary = "Analyze domain reputation and keywords of a link")
    public ResponseEntity<Analysis> analyzeUrl(@Valid @RequestBody AnalysisRequest request, Principal principal) {
        String username = principal != null ? principal.getName() : "anonymousUser";
        return ResponseEntity.ok(analysisService.analyzeUrl(request.getContent(), username));
    }

    @PostMapping(value = "/screenshot", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload image screenshot for OCR text scan and AI scoring")
    public ResponseEntity<Analysis> analyzeScreenshot(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "description", required = false) String description,
            Principal principal) throws IOException {
        String username = principal != null ? principal.getName() : "anonymousUser";
        return ResponseEntity.ok(analysisService.analyzeScreenshot(
                file.getBytes(),
                file.getOriginalFilename(),
                description,
                username
        ));
    }
}
