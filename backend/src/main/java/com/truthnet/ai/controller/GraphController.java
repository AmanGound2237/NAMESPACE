package com.truthnet.ai.controller;

import com.truthnet.ai.dto.GraphResponse;
import com.truthnet.ai.service.GraphService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/graph")
@Tag(name = "Network Graph Operations", description = "Endpoints for ReactFlow network generation")
public class GraphController {

    private final GraphService graphService;

    public GraphController(GraphService graphService) {
        this.graphService = graphService;
    }

    @GetMapping("/network")
    @Operation(summary = "Fetch complete scam relationship nodes and edges")
    public ResponseEntity<GraphResponse> getNetwork() {
        return ResponseEntity.ok(graphService.getNetworkGraph());
    }

    @GetMapping("/entity/{id}")
    @Operation(summary = "Get meta properties for a specific entity node")
    public ResponseEntity<Map<String, Object>> getEntityDetails(@PathVariable("id") String id) {
        return ResponseEntity.ok(graphService.getEntityDetails(id));
    }
}
