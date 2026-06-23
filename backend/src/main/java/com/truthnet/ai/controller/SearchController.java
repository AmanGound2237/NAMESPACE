package com.truthnet.ai.controller;

import com.truthnet.ai.model.Analysis;
import com.truthnet.ai.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
@Tag(name = "Search Operations", description = "Endpoints for searching entities and analyses")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    @Operation(summary = "Search threat analysis records and explanations")
    public ResponseEntity<List<Analysis>> search(@RequestParam(value = "q", required = false) String query) {
        return ResponseEntity.ok(searchService.search(query));
    }
}
