package com.truthnet.ai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node("URL")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UrlNode {

    @Id
    private String url; // The full URL string

    @Relationship(type = "CONNECTED_TO", direction = Relationship.Direction.OUTGOING)
    private DomainNode domain;
}
