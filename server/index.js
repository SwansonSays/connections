const express = require('express');
const {MongoClient, Admin} = require('mongodb');
require('dotenv').config()

const app  = express();
const PORT = process.env.PORT || 8080;

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

app.post('/testPost', (req, res) => {
    console.log("post test happened");

    res.send({ message: 'Success'});
});

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.get('/getTest', (req, res) => {
    console.log("\'/getTest\' endpoint used");
    res.json({message: 'Data Data Data'});
});

app.get('/word', async (req, res) => {
    console.log('\'/word\' endpoint used');
    const word = req.query;
    console.log(word);

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        const database = client.db("connections");
        const document = database.collection("words");       

        const data = await document.findOne(word);

        console.log(data);
        res.json(data);
    } catch(e) {
        console.log(e);
    } finally {
        console.log("Connection Closed")
        await client.close();
    }
});

app.get('/top5', async (req, res) => {
    console.log('***\'/top5\' endpoint used***');
    //console.log(req);
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        const database = client.db("connections");
        const document = database.collection("words");       

        const top5 = await document.find({})
            .sort({frequency: -1})
            .limit(5)
            .toArray();

        console.log(top5);
        res.json(top5);
        console.log('***\'/top5\' endpoint finished***');
    } catch(e) {
        console.log(e);
    } finally {
        console.log("Connection Closed")
        await client.close()
    }
});

app.get('/mostUsed', async (req, res) => {
    console.log('***\'/mostUsed\' endpoint used***');
    let amount = parseInt(req.query.amount, 10);
    let skip = parseInt(req.query.skip, 10);

    console.log(amount);
    

    if(isNaN(skip)) {
        console.log("inside")
        skip = 0;
    }
    console.log(skip);

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        const database = client.db("connections");
        const document = database.collection("words");       

        const top5 = await document.find({})
            .sort({frequency: -1})
            .skip(skip)
            .limit(amount)
            .toArray();

        console.log(top5);
        res.json(top5);
        console.log('***\'/mostUsed\' endpoint finished***');
    } catch(e) {
        console.log(e);
    } finally {
        console.log("Connection Closed")
        await client.close()
    }
});

async function bfs(startWord) {
    let graph = {
        nodes: [],
        edges: [],
    };
    const visited = new Set();
    const stack = [startWord];

    let count = 0;

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try{
        const database = client.db("connections");
        const document = database.collection("words");

        //stack.length
        while(count < 20) {
            const currentNode = stack.pop();
    
            if( visited.has(currentNode)){
                console.log("SKIP: " + currentNode);
                continue;
            } 
    
            visited.add(currentNode);
            let connectedWords = [];
         
            const nodeData = await document.findOne({word: currentNode});
    
            for(const usage of nodeData.usages) {
                for(const word of usage.grouped_with)
                connectedWords.push({word: word, color: usage.color, puzzle: usage.puzzle_number});
            }
    
            graph.nodes.push({word: currentNode, label: currentNode, size: nodeData.frequency});
    
            for(const word of connectedWords) {
                if(!visited.has(word.word)) {
                    stack.push(word.word);
                    graph.edges.push({source: currentNode, target: word.word, color: word.color, label: `Puzzle: ${word.puzzle}`});
                }
            }
    
            count++;
            console.log("CURRENT WORD: " + currentNode + ", IN Q: " + stack.length + ", PROCESSED: " + count + ", TOTAL WORDS: " + 2787);
        }

    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }



    console.log(graph);

    return graph;
};
  
app.get('/wordGraph', async (req, res) => {
    const startWord = req.query.startWord;
    graph = bfs(startWord);
    res.json(graph);
});

app.get('/wordGraph1', async (req, res) => {
    const graph = {
        nodes: [
            { word: 'BUCKS', label: 'BUCKS', size: 5 },
            { word: 'NETS', label: 'NETS', size: 5 },
            { word: 'JAZZ', label: 'JAZZ', size: 10 },
            { word: 'RAP', label: 'RAP', size: 5 },
            { word: 'PUNK', label: 'PUNK', size: 10 },
            { word: 'METAL', label: 'METAL', size: 10 },
            { word: 'GOTH', label: 'GOTH', size: 5 },
            { word: 'GLAM', label: 'GLAM', size: 5 },
            { word: 'PLASTIC', label: 'PLASTIC', size: 10 },
            { word: 'SUPPLE', label: 'SUPPLE', size: 5 },
            { word: 'LIMBER', label: 'LIMBER', size: 5 },
            { word: 'ELASTIC', label: 'ELASTIC', size: 5 },
            { word: 'PAPER', label: 'PAPER', size: 30 },
            { word: 'REPORT', label: 'REPORT', size: 10 },
            { word: 'ESSAY', label: 'ESSAY', size: 5 },
            { word: 'ARTICLE', label: 'ARTICLE', size: 10 },
            { word: 'STORY', label: 'STORY', size: 10 },
            { word: 'LEVEL', label: 'LEVEL', size: 35 },
            { word: 'TENET', label: 'TENET', size: 5 },
            { word: 'REFER', label: 'REFER', size: 5 }
        ],
        edges: [

              {
                source: 'BUCKS',
                target: 'JAZZ',
                color: 'green',
                label: 'Puzzle: 1'
              },
              {
                source: 'BUCKS',
                target: 'NETS',
                color: 'green',
                label: 'Puzzle: 1'
              },

              {
                source: 'NETS',
                target: 'JAZZ',
                color: 'green',
                label: 'Puzzle: 1'
              },


              {
                source: 'JAZZ',
                target: 'PUNK',
                color: 'yellow',
                label: 'Puzzle: 21'
              },
              {
                source: 'JAZZ',
                target: 'RAP',
                color: 'yellow',
                label: 'Puzzle: 21'
              },

              {
                source: 'RAP',
                target: 'PUNK',
                color: 'yellow',
                label: 'Puzzle: 21'
              },

              {
                source: 'PUNK',
                target: 'GLAM',
                color: 'blue',
                label: 'Puzzle: 425'
              },
              {
                source: 'PUNK',
                target: 'GOTH',
                color: 'blue',
                label: 'Puzzle: 425'
              },
              {
                source: 'PUNK',
                target: 'METAL',
                color: 'blue',
                label: 'Puzzle: 425'
              },
              
              {
                source: 'METAL',
                target: 'PAPER',
                color: 'green',
                label: 'Puzzle: 110'
              },
              {
                source: 'METAL',
                target: 'PLASTIC',
                color: 'green',
                label: 'Puzzle: 110'
              },
              {
                source: 'METAL',
                target: 'GLAM',
                color: 'blue',
                label: 'Puzzle: 425'
              },
              {
                source: 'METAL',
                target: 'GOTH',
                color: 'blue',
                label: 'Puzzle: 425'
              },
              {
                source: 'GOTH',
                target: 'GLAM',
                color: 'blue',
                label: 'Puzzle: 425'
              },

              {
                source: 'PLASTIC',
                target: 'PAPER',
                color: 'green',
                label: 'Puzzle: 110'
              },
              {
                source: 'PLASTIC',
                target: 'ELASTIC',
                color: 'green',
                label: 'Puzzle: 259'
              },
              {
                source: 'PLASTIC',
                target: 'LIMBER',
                color: 'green',
                label: 'Puzzle: 259'
              },
              {
                source: 'PLASTIC',
                target: 'SUPPLE',
                color: 'green',
                label: 'Puzzle: 259'
              },
              {
                source: 'SUPPLE',
                target: 'ELASTIC',
                color: 'green',
                label: 'Puzzle: 259'
              },
              {
                source: 'SUPPLE',
                target: 'LIMBER',
                color: 'green',
                label: 'Puzzle: 259'
              },
              {
                source: 'LIMBER',
                target: 'ELASTIC',
                color: 'green',
                label: 'Puzzle: 259'
              },


              
        ]
    };


    res.json(graph);
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


