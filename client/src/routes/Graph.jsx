import { useEffect, useState } from 'react';
import { SigmaContainer } from '@react-sigma/core';
import WordGraph from '../components/GraphMaker';
import NavBar from '../components/NavBar';

function Graph() {
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {    
        fetch('/wordGraph1')
          .then((response) => response.json())
          .then((data) => setGraphData(data))
          .catch((error) => console.error('Error fetching graph data: ', error));
      }, []);

    return(
        <div>
            <NavBar />
            <SigmaContainer style={{ height: "100vh", width: "100vh" }}>
                {graphData ? <WordGraph data={graphData} /> : <p>Loading...</p>}
            </SigmaContainer>
        </div>

    );
};

export default Graph;