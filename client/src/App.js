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
    } else {
      setResults({ error: 'An error occurred while searching'});
    }
    console.log(results);
  } catch(error) {
    console.log(error);
    setResults({ error: 'An error occurred while searching'});
  }
};


  return (
    <div className="App">
      <h1>Hello</h1>
      <form
        action='/testPost'
        method="post"
        className="form">
        <button type="submit">
          Connected?
        </button>
      </form>
      
      {results && <div>
        <p>
          ID: {results._id}
        </p>
        <p>
          Word: {results.word}
        </p>
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
          Usages:
          <p>Puzzle Number: {results.usages[0].puzzle_number}</p>
          <p>Description: {results.usages[0].description}</p>
          <p>Color: {results.usages[0].color}</p>
          <p>Grouped With: {results.usages[0].grouped_with[0]}, {results.usages[0].grouped_with[1]}, {results.usages[0].grouped_with[2]}</p>
        </p>
      </div>}

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
