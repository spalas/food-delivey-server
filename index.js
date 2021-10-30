const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');




const app = express();

const port = process.env.PORT || 5000;



// middleware
app.use(cors());
app.use(express());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ooztb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)



async function run() {
    try {
        await client.connect();
        const database = client.db('products')
        const itemsCollection = database.collection('items')
        // get
        app.get('/items', async (req, res) => {
            const itemsCollection = database.collection('items')
            const cursor = itemsCollection.find({});
            const items = await cursor.toArray();
            res.send(items);
        })

    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir)





// client.connect(err => {
//     const collection = client.db("products").collection("items");
//     // perform actions on the collection object
//     client.close();
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

