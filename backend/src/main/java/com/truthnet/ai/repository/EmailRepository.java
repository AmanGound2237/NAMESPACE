package com.truthnet.ai.repository;

import com.truthnet.ai.model.EmailNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository extends Neo4jRepository<EmailNode, String> {
}
