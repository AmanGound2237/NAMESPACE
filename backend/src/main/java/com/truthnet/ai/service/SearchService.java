package com.truthnet.ai.service;

import com.truthnet.ai.model.Analysis;
import com.truthnet.ai.repository.AnalysisRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SearchService {

    private final AnalysisRepository analysisRepository;

    public SearchService(AnalysisRepository analysisRepository) {
        this.analysisRepository = analysisRepository;
    }

    public List<Analysis> search(String query) {
        log.info("Performing network threat search for query: {}", query);
        if (query == null || query.trim().isEmpty()) {
            return analysisRepository.findRecent(10);
        }
        return analysisRepository.searchAnalyses("(?i).*" + query.trim() + ".*");
    }
}
