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

@Node("Email")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailNode {

    @Id
    private String email; // The email address itself

    @Relationship(type = "REFERENCES", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<DomainNode> domains = new HashSet<>();
}
