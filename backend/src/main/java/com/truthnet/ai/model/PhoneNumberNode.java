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

@Node("PhoneNumber")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhoneNumberNode {

    @Id
    private String phoneNumber; // The phone number itself

    @Relationship(type = "ASSOCIATED_WITH", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<OrganizationNode> organizations = new HashSet<>();

    @Relationship(type = "ASSOCIATED_WITH", direction = Relationship.Direction.OUTGOING)
    @Builder.Default
    private Set<PersonNode> people = new HashSet<>();
}
