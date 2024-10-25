import { useEffect, useState } from 'react';

function Admin() {
    const [graphData, setGraphData] = useState(null);



    useEffect(() => {
      fetch('/wordGraph1')
        .then((response) => response.json())
        .then((data) => setGraphData(data))
        .catch((error) => console.error('Error fetching graph data: ', error));
    }, []);
  
    function handleGraphClick() {
      fetch('/wordGraph?startWord=BUCKS')
        .then(response => response.json());
    };

    return(
        <div>
            <button onClick={handleGraphClick}>Get Graph Data</button>
        </div>
    );
}

export default Admin;