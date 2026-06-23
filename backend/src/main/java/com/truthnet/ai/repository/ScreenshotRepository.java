package com.truthnet.ai.repository;

import com.truthnet.ai.model.ScreenshotNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScreenshotRepository extends Neo4jRepository<ScreenshotNode, String> {
}
