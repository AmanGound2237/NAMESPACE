package com.truthnet.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private List<StatCardDto> stats;
    private List<RecentAnalysisDto> recent;
    private List<ThreatSummaryDto> threats;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class StatCardDto {
        private String title;
        private String value;
        private String change;
        private String trend;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecentAnalysisDto {
        private String id;
        private String type;
        private String target;
        private int score;
        private String verdict;
        private String date;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ThreatSummaryDto {
        private String id;
        private String title;
        private int count;
        private String level;
        private String description;
    }
}
