const express = require('express');
const {MongoClient, Admin} = require('mongodb');
require('dotenv').config()

const app  = express();
const PORT = process.env.PORT || 8080;

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

async function insertGraph(graph) {
  console.log("Inserting Graph");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    const database = client.db("connections");
    const document = database.collection("graph");
    const result = await document.insertOne(graph);
  } catch(e) {
    console.log(e);
  } finally {
    console.log("Graph Inserted.");
    await client.close();
  }
};

async function bfs(startWord) {
    let graph = {
        name: startWord,
        nodes: [],
        edges: [],
    };
    const visited = new Set();
    const inQueue = new Set();
    const stack = [startWord];

    let count = 0;

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try{
        const database = client.db("connections");
        const document = database.collection("words");

        while(stack.length) {
            const currentNode = stack.pop();
    
            if( visited.has(currentNode)){
                console.log("SKIP: " + currentNode);
                continue;
            } 
    
            visited.add(currentNode);
            let connectedWords = [];
         
            const nodeData = await document.findOne({word: currentNode});
    
            for(const usage of nodeData.usages) {
                for(const word of usage.grouped_with){
                  connectedWords.push({word: word, color: usage.color, puzzle: usage.puzzle_number});
                }
            }
    
            graph.nodes.push({word: currentNode, label: currentNode, size: nodeData.frequency});
    
            for(const word of connectedWords) {
                if(!visited.has(word.word) && !inQueue.has(word.word)) {
                    stack.push(word.word);
                    inQueue.add(word.word);
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
    insertGraph(graph);
    return graph;
};
  
app.get('/createWordGraph', async (req, res) => {
    const startWord = req.query.startWord;
    graph = bfs(startWord);

    res.json(graph);
});

app.get('/wordGraph', async (req, res) => {
  console.log("WORDGRAPH CALLD");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    const database = client.db("connections");
    const document = database.collection("graph");

    console.log("Searching DB");

    const result = await document.findOne({name: "SLEET"});
    console.log("GOT GRAPH");
    console.log("SENDING TO FRONTEND");
    res.json(result);
    console.log("RESULTS SENT")
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
    console.log("CONNECTION CLOSED");
  }

    
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


