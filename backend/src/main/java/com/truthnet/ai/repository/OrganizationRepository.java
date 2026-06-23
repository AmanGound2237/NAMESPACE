package com.truthnet.ai.repository;

import com.truthnet.ai.model.OrganizationNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends Neo4jRepository<OrganizationNode, String> {
}
