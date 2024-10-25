import './App.css';
import { useEffect, useState } from 'react'



function App() {
  //const [test, setTest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [top5, setTop5] = useState(null);
  const [mostUsed, setMostUsed] = useState(null);
  const [mostUsedAmount, setMostUsedAmount] = useState("");

  /*
  useEffect(() => {
    fetch('/word')
      .then(response => response.json())
      .then(data => setTest(data));

  }, []);
  */

  useEffect(() => {
    /*
    fetch('/top5')
      .then(response => response.json())
      .then(data => setTop5(data));
    

    fetch('/wordGraph?startWord=BUCKS')
      .then(response => response.json());
    */
  }, []);

  function handleGraphClick() {
    fetch('/wordGraph?startWord=BUCKS')
      .then(response => response.json());
  };


const handleSearchSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`/word?word=${searchTerm.toUpperCase()}`);
    if (response.ok) {
      const data = await response.json();
      setResults(data);
      console.log(data);
    } else {
      setResults({ error: 'An error occurred while searching'});
    }
    
  } catch(error) {
    console.log(error);
    setResults({ error: 'An error occurred while searching'});
  }
};

function formatResults(){
  let count = results.usages.length;
  let usages = [];

  for(let i = 0; i < count; i++) {
    usages.push(
      <div>
        <div>{i+1}:</div>
        <div>Puzzle Number: {results.usages[i].puzzle_number}</div>
        <div>Description: {results.usages[i].description}</div>
        <div>Color: {results.usages[i].color}</div>
        <div>Grouped With: {results.usages[i].grouped_with[0]}, {results.usages[i].grouped_with[1]}, {results.usages[i].grouped_with[2]}</div>
      </div>
    )
  }

  return (
    <div>
      <h2>
        Word: {results.word}
      </h2>
      <p>
        Frequency: {results.frequency}
      </p>
      <p>
        Color Frequency:
        <p>Yellow: {results.color_freq.yellow}</p>
        <p>Green: {results.color_freq.green}</p> 
        <p>Blue: {results.color_freq.blue}</p> 
        <p>Purple: {results.color_freq.purple}</p> 
      </p>
      <p>
        <div>Usages:</div>
        {usages}
      </p>
      
    </div>
  );
};

const handleMostUsedSubmit = async (e) =>  {
  e.preventDefault();
  try {
    //&skip=10
    const response = await fetch(`/mostUsed?amount=${parseInt(mostUsedAmount)}`);
    if (response.ok) {
      const data = await response.json();
      setMostUsed(data);
    } else {
      setMostUsed({ error: 'An error occurred while searching'});
    }
  } catch(error) {
    console.log(error);
    setMostUsed({ error: 'An error occurred while finding Most Used'});
  }
};

function getMostUsedResults() {
  let words = [];
  for(let i = 0; i < mostUsed.length; i++) {
    words.push(
      <div>
        {mostUsed[i].word}: {mostUsed[i].frequency}
      </div>
    );
  }
  return(
    <div>
      <div>Most Used: </div>
      <div>{words}</div>
    </div>
  );
}


  return (
    <div className="App">
      <h1>Connections Data</h1>

      <button onClick={handleGraphClick}>SHOW GRAPH</button>


      <form onSubmit={handleMostUsedSubmit}>
        <div>
          {mostUsed && getMostUsedResults()}
        </div>
        <input
          name="amount"
          placeholder='Enter Amount Of Top Used Words'
          value={mostUsedAmount}
          onChange={(e) => setMostUsedAmount(e.target.value)}
        />
        <button type="submit">Most Used</button>
      </form>

      <div>
        <div>{top5 && top5[0].word}: {top5 && top5[0].frequency}</div>
        <div>{top5 && top5[1].word}: {top5 && top5[1].frequency}</div>
        <div>{top5 && top5[2].word}: {top5 && top5[2].frequency}</div>
        <div>{top5 && top5[3].word}: {top5 && top5[3].frequency}</div>
        <div>{top5 && top5[4].word}: {top5 && top5[4].frequency}</div>
      </div>

      <div>
      {results && formatResults()}
      </div>

      <form onSubmit={handleSearchSubmit}>
          <input 
            name="query" 
            placeholder='Enter word'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
