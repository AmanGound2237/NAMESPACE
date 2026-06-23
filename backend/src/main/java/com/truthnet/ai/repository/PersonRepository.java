package com.truthnet.ai.repository;

import com.truthnet.ai.model.PersonNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends Neo4jRepository<PersonNode, String> {
}
