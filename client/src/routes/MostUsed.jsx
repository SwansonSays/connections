import {useState} from 'react'

function MostUsed() {
    const [mostUsed, setMostUsed] = useState(null);
    const [mostUsedAmount, setMostUsedAmount] = useState("");

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
    };

    return(
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
    );
};

export default MostUsed;