import './App.css';
import { useEffect, useState } from 'react'



function App() {
  //const [test, setTest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);

  /*
  useEffect(() => {
    fetch('/word')
      .then(response => response.json())
      .then(data => setTest(data));

  }, []);
  */
const handleSubmit = async (e) => {
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


  return (
    <div className="App">
      <h1>Connections Data</h1>
      {/*
      <form
        action='/testPost'
        method="post"
        className="form">
        <button type="submit">
          Connected?
        </button>
      </form>
      */
      }
      <div>
      {results && formatResults()}
      </div>

      <form onSubmit={handleSubmit}>
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
