//req shortcut
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
// const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 8000

//middleware to support projects
app.use(cors())
app.use(express.json())

// DB_USER:carService
// DB_PASS:gD5SOTsY1izbyzB1

//new de_user: sells
//new password:S48oGQl7ieVmvbjz

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sow4u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {

        await client.connect();
        const sellsCollection = client.db('carService').collection('service')

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = sellsCollection.find(query)
            const sells = await cursor.toArray()
            res.send(sells)
        })

        app.get('/service/:id', async(req, res)=>{
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const service = await sellsCollection.findOne(query)
            res.send(service)
        })
    
        //send data server to database 
        app.post('/service', async(req, res) =>{
            const newService = req.body;
            const result =  await sellsCollection.insertOne(newService)
            res.send(result)
        })


    }
    finally {

    }


}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hi this is  car service backend')
})

app.listen(port, () => {
    console.log('Node server is running on the PORT: ', port);
})