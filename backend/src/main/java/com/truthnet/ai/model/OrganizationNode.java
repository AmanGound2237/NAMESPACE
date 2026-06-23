package com.truthnet.ai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Organization")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationNode {

    @Id
    private String name; // Name of the organization
}
