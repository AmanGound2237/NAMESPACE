package com.truthnet.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GraphResponse {

    private List<ReactFlowFileNode> nodes;
    private List<ReactFlowFileEdge> edges;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ReactFlowFileNode {
        private String id;
        private Map<String, Object> data;
        private Position position;
        private Map<String, Object> style;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ReactFlowFileEdge {
        private String id;
        private String source;
        private String target;
        private String label;
        private boolean animated;
        private Map<String, Object> style;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Position {
        private int x;
        private int y;
    }
}
