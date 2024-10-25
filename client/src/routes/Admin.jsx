import { useState } from 'react';
import NavBar from '../components/NavBar';

function Admin() {
  const [graphData, setGraphData] = useState(null);
  

  function handleGraphClick() {
    fetch('/createWordGraph?startWord=SLEET')
      .then(response => response.json())
      .then((data) => setGraphData(data))
      .catch((error) => console.error('Error fetching graph data: ', error));

    console.log(graphData);
  };

  return(
      <div>
        <NavBar />
        <button onClick={handleGraphClick}>Get Graph Data</button>
        {graphData && graphData.name}
      </div>
  );
};

export default Admin;