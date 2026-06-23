package com.truthnet.ai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

@Node("Domain")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DomainNode {

    @Id
    private String domain; // The domain name (e.g. google.com)

    @Relationship(type = "TARGETS", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<OrganizationNode> targetOrganizations = new HashSet<>();

    @Relationship(type = "TARGETS", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<PersonNode> targetPeople = new HashSet<>();
}
