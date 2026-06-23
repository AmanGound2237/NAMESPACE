package com.truthnet.ai.repository;

import com.truthnet.ai.model.PhoneNumberNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneNumberRepository extends Neo4jRepository<PhoneNumberNode, String> {
}
