package com.truthnet.ai.repository;

import com.truthnet.ai.model.UrlNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlRepository extends Neo4jRepository<UrlNode, String> {
}
