import {useState} from 'react';

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState(null);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/word?word=${searchTerm.toUpperCase()}`);
            if(response.ok) {
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

    return(
        <form onSubmit={handleSearchSubmit}>
            <div>
                {results && formatResults()}
            </div>
            <input 
                name="query" 
                placeholder='Enter word'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;