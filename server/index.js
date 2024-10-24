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
        await client.close()
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
})

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
})
  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


