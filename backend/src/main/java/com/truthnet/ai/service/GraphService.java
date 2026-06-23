package com.truthnet.ai.service;

import com.truthnet.ai.dto.GraphResponse;
import lombok.extern.slf4j.Slf4j;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.Session;
import org.neo4j.driver.types.Node;
import org.neo4j.driver.types.Relationship;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class GraphService {

    private final Driver driver;

    public GraphService(Driver driver) {
        this.driver = driver;
    }

    public GraphResponse getNetworkGraph() {
        log.info("Fetching network graph structure from Neo4j");
        
        List<GraphResponse.ReactFlowFileNode> reactFlowNodes = new ArrayList<>();
        List<GraphResponse.ReactFlowFileEdge> reactFlowEdges = new ArrayList<>();

        // Keep track of visited nodes to avoid duplicates
        Set<String> processedNodeIds = new HashSet<>();
        Set<String> processedEdgeIds = new HashSet<>();

        // Columns layout offsets
        Map<String, Integer> columnCounters = new HashMap<>();

        try (Session session = driver.session()) {
            // Query all nodes and their labels
            String nodeQuery = "MATCH (n) RETURN id(n) as internalId, labels(n) as labels, properties(n) as props";
            session.run(nodeQuery).list().forEach(record -> {
                long internalId = record.get("internalId").asLong();
                List<String> labels = record.get("labels").asList(Record::asString);
                Map<String, Object> props = record.get("props").asMap();

                String label = labels.isEmpty() ? "Unknown" : labels.get(0);
                String idStr = String.valueOf(internalId);

                // Determine display label
                String displayLabel = getDisplayLabel(label, props);
                if (displayLabel == null) return;

                // Position calculation based on type
                int colX = getXCoordinateForLabel(label);
                int counter = columnCounters.getOrDefault(label, 0);
                int posY = counter * 100 - 150; // simple spacing
                columnCounters.put(label, counter + 1);

                // Style selection
                Map<String, Object> style = getNodeStyle(label, props);

                GraphResponse.ReactFlowFileNode nodeDto = GraphResponse.ReactFlowFileNode.builder()
                        .id(idStr)
                        .data(Map.of("label", displayLabel))
                        .position(new GraphResponse.Position(colX, posY))
                        .style(style)
                        .build();

                reactFlowNodes.add(nodeDto);
                processedNodeIds.add(idStr);
            });

            // Query all relationships
            String relQuery = "MATCH (src)-[r]->(tgt) RETURN id(src) as srcId, id(tgt) as tgtId, type(r) as relType";
            session.run(relQuery).list().forEach(record -> {
                long srcId = record.get("srcId").asLong();
                long tgtId = record.get("tgtId").asLong();
                String relType = record.get("relType").asString();

                String edgeId = srcId + "-" + tgtId + "-" + relType;
                if (!processedEdgeIds.contains(edgeId)) {
                    // Check if both nodes exist in ReactFlow node list
                    if (processedNodeIds.contains(String.valueOf(srcId)) && processedNodeIds.contains(String.valueOf(tgtId))) {
                        
                        Map<String, Object> edgeStyle = getEdgeStyle(relType);

                        GraphResponse.ReactFlowFileEdge edgeDto = GraphResponse.ReactFlowFileEdge.builder()
                                .id(edgeId)
                                .source(String.valueOf(srcId))
                                .target(String.valueOf(tgtId))
                                .label(relType)
                                .animated(isAnimatedRelationship(relType))
                                .style(edgeStyle)
                                .build();

                        reactFlowEdges.add(edgeDto);
                        processedEdgeIds.add(edgeId);
                    }
                }
            });
        } catch (Exception e) {
            log.error("Failed to query Neo4j graph data", e);
            // Return empty or mock layout if Neo4j query fails
            return generateMockGraph();
        }

        // If no nodes in DB, return mock graph for visualization demonstration
        if (reactFlowNodes.isEmpty()) {
            return generateMockGraph();
        }

        return new GraphResponse(reactFlowNodes, reactFlowEdges);
    }

    public Map<String, Object> getEntityDetails(String entityId) {
        log.info("Fetching details for entity ID: {}", entityId);
        try (Session session = driver.session()) {
            String query = "MATCH (n) WHERE id(n) = $id RETURN labels(n) as labels, properties(n) as props";
            Map<String, Object> params = Map.of("id", Long.parseLong(entityId));
            List<Record> records = session.run(query, params).list();
            if (!records.isEmpty()) {
                Record record = records.get(0);
                Map<String, Object> details = new HashMap<>();
                details.put("labels", record.get("labels").asList(Record::asString));
                details.put("properties", record.get("props").asMap());
                return details;
            }
        } catch (Exception e) {
            log.error("Error fetching entity details", e);
        }
        return Map.of("error", "Entity not found");
    }

    private String getDisplayLabel(String label, Map<String, Object> props) {
        if ("User".equals(label)) {
            return "User: " + props.getOrDefault("username", "Unknown");
        } else if ("Analysis".equals(label)) {
            return "Analysis (" + props.getOrDefault("type", "General") + ") - Score: " + props.getOrDefault("score", "0");
        } else if ("Email".equals(label)) {
            return "Email: " + props.getOrDefault("email", "");
        } else if ("Domain".equals(label)) {
            return "Domain: " + props.getOrDefault("domain", "");
        } else if ("URL".equals(label)) {
            return "URL: " + props.getOrDefault("url", "");
        } else if ("PhoneNumber".equals(label)) {
            return "Phone: " + props.getOrDefault("phoneNumber", "");
        } else if ("Person".equals(label)) {
            return "Person: " + props.getOrDefault("name", "");
        } else if ("Organization".equals(label)) {
            return "Org: " + props.getOrDefault("name", "");
        } else if ("Screenshot".equals(label)) {
            return "Screenshot: " + props.getOrDefault("fileName", "");
        }
        return null;
    }

    private int getXCoordinateForLabel(String label) {
        return switch (label) {
            case "User" -> -400;
            case "Analysis" -> -200;
            case "Email" -> 0;
            case "URL" -> 0;
            case "Domain" -> 200;
            case "PhoneNumber" -> 200;
            case "Organization" -> 400;
            case "Person" -> 400;
            default -> 600;
        };
    }

    private Map<String, Object> getNodeStyle(String label, Map<String, Object> props) {
        Map<String, Object> style = new HashMap<>();
        style.put("color", "#e2e8f0");
        style.put("borderRadius", 14);
        style.put("padding", 12);

        switch (label) {
            case "Analysis" -> {
                int score = ((Number) props.getOrDefault("score", 0)).intValue();
                if (score >= 75) {
                    style.put("background", "rgba(225, 29, 72, 0.65)"); // high risk red
                    style.put("border", "1px solid rgba(244, 63, 94, 0.8)");
                } else if (score >= 40) {
                    style.put("background", "rgba(217, 119, 6, 0.65)"); // moderate risk orange
                    style.put("border", "1px solid rgba(245, 158, 11, 0.8)");
                } else {
                    style.put("background", "rgba(5, 150, 105, 0.65)"); // safe green
                    style.put("border", "1px solid rgba(16, 185, 129, 0.8)");
                }
            }
            case "Email" -> {
                style.put("background", "rgba(14, 116, 144, 0.65)");
                style.put("border", "1px solid rgba(56, 189, 248, 0.6)");
            }
            case "Domain" -> {
                style.put("background", "rgba(30, 64, 175, 0.6)");
                style.put("border", "1px solid rgba(99, 102, 241, 0.6)");
            }
            case "URL" -> {
                style.put("background", "rgba(34, 197, 94, 0.2)");
                style.put("border", "1px solid rgba(34, 197, 94, 0.6)");
            }
            case "PhoneNumber" -> {
                style.put("background", "rgba(8, 145, 178, 0.65)");
                style.put("border", "1px solid rgba(34, 211, 238, 0.6)");
            }
            default -> {
                style.put("background", "rgba(15, 23, 42, 0.8)");
                style.put("border", "1px solid rgba(148, 163, 184, 0.4)");
            }
        }
        return style;
    }

    private Map<String, Object> getEdgeStyle(String relType) {
        return switch (relType) {
            case "SUBMITTED" -> Map.of("stroke", "#38bdf8", "strokeWidth", 2);
            case "CONTAINS" -> Map.of("stroke", "#818cf8", "strokeWidth", 2);
            case "REFERENCES" -> Map.of("stroke", "#f43f5e", "strokeWidth", 2);
            case "CONNECTED_TO" -> Map.of("stroke", "#34d399", "strokeWidth", 2);
            case "TARGETS" -> Map.of("stroke", "#fbbf24", "strokeWidth", 2);
            default -> Map.of("stroke", "#94a3b8", "strokeWidth", 1.5);
        };
    }

    private boolean isAnimatedRelationship(String relType) {
        return "SUBMITTED".equals(relType) || "CONNECTED_TO".equals(relType) || "REFERENCES".equals(relType);
    }

    private GraphResponse generateMockGraph() {
        List<GraphResponse.ReactFlowFileNode> nodes = new ArrayList<>();
        List<GraphResponse.ReactFlowFileEdge> edges = new ArrayList<>();

        nodes.add(new GraphResponse.ReactFlowFileNode("email", Map.of("label", "Email: billing@trust-secure.com"),
                new GraphResponse.Position(0, 0),
                Map.of("background", "rgba(14, 116, 144, 0.65)", "color", "#e2e8f0", "border", "1px solid rgba(56, 189, 248, 0.6)", "borderRadius", 14, "padding", 12)));

        nodes.add(new GraphResponse.ReactFlowFileNode("domain", Map.of("label", "Domain: secure-invoice-portal.net"),
                new GraphResponse.Position(260, -120),
                Map.of("background", "rgba(30, 64, 175, 0.6)", "color", "#e2e8f0", "border", "1px solid rgba(99, 102, 241, 0.6)", "borderRadius", 14, "padding", 12)));

        nodes.add(new GraphResponse.ReactFlowFileNode("phone", Map.of("label", "Phone: +1 (312) 555-0136"),
                new GraphResponse.Position(260, 120),
                Map.of("background", "rgba(8, 145, 178, 0.65)", "color", "#e2e8f0", "border", "1px solid rgba(34, 211, 238, 0.6)", "borderRadius", 14, "padding", 12)));

        nodes.add(new GraphResponse.ReactFlowFileNode("victim", Map.of("label", "Victim: Accounts Payable Team"),
                new GraphResponse.Position(560, 0),
                Map.of("background", "rgba(15, 23, 42, 0.8)", "color", "#e2e8f0", "border", "1px solid rgba(148, 163, 184, 0.4)", "borderRadius", 14, "padding", 12)));

        edges.add(new GraphResponse.ReactFlowFileEdge("e1-2", "email", "domain", "REFERENCES", true, Map.of("stroke", "#38bdf8", "strokeWidth", 2)));
        edges.add(new GraphResponse.ReactFlowFileEdge("e1-3", "email", "phone", "CONTAINS", true, Map.of("stroke", "#22d3ee", "strokeWidth", 2)));
        edges.add(new GraphResponse.ReactFlowFileEdge("e2-4", "domain", "victim", "TARGETS", false, Map.of("stroke", "#60a5fa", "strokeWidth", 2)));
        edges.add(new GraphResponse.ReactFlowFileEdge("e3-4", "phone", "victim", "ASSOCIATED_WITH", false, Map.of("stroke", "#38bdf8", "strokeWidth", 2)));

        return new GraphResponse(nodes, edges);
    }
}
