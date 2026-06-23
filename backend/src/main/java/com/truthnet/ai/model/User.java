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

@Node("User")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String username; // Username acts as the unique identifier

    private String email;
    private String password;
    private String role;

    @Relationship(type = "SUBMITTED", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<Analysis> analyses = new HashSet<>();
}
