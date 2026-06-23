package com.truthnet.ai.controller;

import com.truthnet.ai.dto.DashboardStatsResponse;
import com.truthnet.ai.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@Tag(name = "Dashboard Statistics", description = "Endpoints for aggregate threat metrics")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    @Operation(summary = "Get overall monitoring and alerts summary numbers")
    public ResponseEntity<List<DashboardStatsResponse.StatCardDto>> getStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }

    @GetMapping("/recent")
    @Operation(summary = "Get listing of the most recent analyses run")
    public ResponseEntity<List<DashboardStatsResponse.RecentAnalysisDto>> getRecent() {
        return ResponseEntity.ok(dashboardService.getRecentAnalyses());
    }

    @GetMapping("/summary")
    @Operation(summary = "Get listing of detected campaign clusters")
    public ResponseEntity<List<DashboardStatsResponse.ThreatSummaryDto>> getSummary() {
        return ResponseEntity.ok(dashboardService.getThreatSummary());
    }
}
