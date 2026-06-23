package com.truthnet.ai.repository;

import com.truthnet.ai.model.Analysis;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalysisRepository extends Neo4jRepository<Analysis, String> {
    
    // Find recent analyses sorted by date or ID
    List<Analysis> findTop10ByOrderByIdDesc();

    @Query("MATCH (a:Analysis) RETURN count(a)")
    long countAllAnalyses();

    @Query("MATCH (a:Analysis) WHERE a.score >= 70 RETURN count(a)")
    long countHighRiskAnalyses();

    @Query("MATCH (a:Analysis) WHERE a.verdict = 'Critical' OR a.verdict = 'High Risk' RETURN count(a)")
    long countThreatsBlocked();

    @Query("MATCH (a:Analysis) RETURN a ORDER BY a.id DESC LIMIT $limit")
    List<Analysis> findRecent(int limit);
    
    @Query("MATCH (a:Analysis) WHERE a.target CONTAINS $query OR a.explanation CONTAINS $query OR a.rawContent CONTAINS $query RETURN a")
    List<Analysis> searchAnalyses(String query);
}
