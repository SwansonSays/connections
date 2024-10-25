import React, { useEffect, useMemo } from 'react';
import { SigmaContainer, ControlsContainer, ZoomControl, useLoadGraph} from '@react-sigma/core';
import '@react-sigma/core/lib/react-sigma.min.css';
import Graph from 'graphology';
//import { circlepack } from 'graphology-layout'
import forceLayout from 'graphology-layout-force';

function WordGraph({ data }) {
    const loadGraph = useLoadGraph();

    const randomColor = useMemo(() => {
        return (): string => {
            const digits = "0123456789abcdef";
            let code = "#";
            for (let i = 0; i < 6; i++) {
                code += digits.charAt(Math.floor(Math.random() * 16));
            }
            return code;
        };
    }, []);

    useEffect(() => {
        if(data) {
            const graph = new Graph();

            data.nodes.forEach(node => {
                graph.addNode(node.word, {
                    label: node.label, 
                    size: node.size,
                    x: Math.random(),
                    y: Math.random(),
                    color: randomColor()
                });
              
            });

            data.edges.forEach(edge => {
                graph.addEdge(edge.source, edge.target, {
                    lable: edge.lable,
                    color: edge.color
                });
            });

            /*
            const positions = circlepack(graph, {
                hierarchyAttributes: ['degree', 'community']
            });
            circlepack.assign(graph);
            */
            forceLayout(graph, {
                maxIterations: 50,
                settings: {
                    gravity: 10
                }
            });
            //forceLayout.assign(graph);

            loadGraph(graph);
        }
    }, [loadGraph, randomColor, data]);


    return (
        <SigmaContainer style={{ height: "100vh", width: "100vh" }}>
            <ControlsContainer position={"top-left"}>
                <ZoomControl />
            </ControlsContainer>
        </SigmaContainer>
    );
};

export default WordGraph;