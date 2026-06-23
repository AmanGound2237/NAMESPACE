package com.truthnet.ai.repository;

import com.truthnet.ai.model.DomainNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DomainRepository extends Neo4jRepository<DomainNode, String> {
}
