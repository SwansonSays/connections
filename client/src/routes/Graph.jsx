import { useEffect, useState } from 'react';
import { SigmaContainer } from '@react-sigma/core';
import WordGraph from '../components/GraphMaker';
import NavBar from '../components/NavBar';
import ExpandingGraph from '../components/ExpandingGraph';

function Graph() {
    const [graphData, setGraphData] = useState(null);
    const [startNode, setStartNode] = useState("");

    /*
    useEffect(() => {    
        fetch('/wordGraph')
          .then((response) => response.json())
          .then((data) => setGraphData(data))
          .catch((error) => console.error('Error fetching graph data: ', error));
      }, []);
    */

    useEffect(() => {

        setStartNode("RING");
        console.log("START NODE SET");
    }, []);

    return(
        <div>
            <NavBar />
            <SigmaContainer style={{ height: "100vh", width: "100vh" }}>
                {/*graphData ? <WordGraph data={graphData} /> : <p>Loading...</p>*/}
                {startNode ? <ExpandingGraph /*startNode={startNode}*/ /> : <p>Loading...</p>}
            </SigmaContainer>
        </div>

    );
};

export default Graph;