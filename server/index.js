import express from "express";
const {MongoClient, Admin} = require('mongodb');

async function main(app) {
    const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);

        app.get('/', (req, res) => {
            res.send('MongoDB connected');
        });

    } catch(e) {
        console.log(e);
    } finally {
        await client.close()
    }
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databasesList.array.forEach(db => console.log(` - ${db.name}`));
};

const app  = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});
  
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

main(app).catch(console.error);

