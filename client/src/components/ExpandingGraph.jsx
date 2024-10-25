import React, {useState, useEffect} from 'react';
import { SigmaContainer, useLoadGraph, useRegisterEvents, ControlsContainer, ZoomControl} from '@react-sigma/core';
import Graph from 'graphology';

function ExpandingGraph() {
    const [startNode, setStartNode] = useState("RING");
    const loadGraph = useLoadGraph();
    const registerEvents = useRegisterEvents();
    const graph = new Graph();

    async function fetchConnectedNodes(node) {
        console.log("IN EG FETCHCONNECTEDNODES");
        const response = await fetch(`getConnectedNodes/${node}`);
        if(response.ok) {
            const data = await response.json();
            return {
                nodes: data.nodes,
                edges: data.edges
            };
        }
    };

    useEffect(() => {
        console.log("IN EG USEEFFECT");
        if(startNode && !graph.hasNode(startNode)) {
            graph.addNode(startNode, {
                label: startNode,
                size: 10,
                x: Math.random(),
                y: Math.random(),
            });
            loadGraph(graph);
        }
        console.log("AFTER IF");
    
        registerEvents({
            clickNode: async (event) => {

                const nodeId = event.node;

                const {nodes, edges} = await fetchConnectedNodes(nodeId);

                nodes.forEach((node) => {
                    if(!graph.hasNode(node.word)) {
                        graph.addNode(node.word, {
                            label: node.label,
                            size: node.size,
                            x: Math.random(),
                            y: Math.random(),
                        });
                    }
                });

                edges.forEach((edge)  => {
                    if(!graph.hasEdge(edge.source, edge.target)) {
                        graph.addEdge(edge.source, edge.target, {
                            label: edge.label,
                            color: edge.color,
                        });
                    }
                });

                loadGraph(graph);
            },
        }); 

        console.log("AFTER REGISTER");
    }, []);

    return(
        <SigmaContainer style={{ height: "100vh", width: "100vh" }}>
            <ControlsContainer position={"top-left"}>
                <ZoomControl />
            </ControlsContainer>
        </SigmaContainer>
    );
};

export default ExpandingGraph;