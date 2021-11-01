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
        // get post
        // app.post('/items', async (req, res) => {
        //     const item = req.body;
        //     console.log('hitting post', item);
        //     const result = await itemsCollection.insertOne(item);
        //     console.log(result);
        //     res.json(result)
        // });


        app.get(('/items/:id', async (req, res) => {
            const id = req.params.id;
            const qurey = { _id: ObjectId(id) }
            const result = await itemsCollection.find(qurey);
            res.send(result);
        }))





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






app.get('/', (req, res) => {
    res.send('fartvip delivery!')
})





app.listen(port, () => {
    console.log('Running fast-vip !!!', port);
})

