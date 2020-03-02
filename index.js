require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())

const MongoClient = require('mongodb').MongoClient
 
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, client) => {
    console.log("Connected successfully to server")
    
    const db = client.db(process.env.DB_NAME)

    app.get('/post/:string', async (req, res) => {
        const CommentsCollection = db.collection('comments')

        await CommentsCollection.insertOne({
            value: req.params.string
        })

        res.send(`Successfully posted comment "${req.params.string}"`)
    })

    app.get('/list', async (req, res) => {
        const CommentsCollection = db.collection('comments')

        const comments = await CommentsCollection.find(
            {}, 
            { 
                projection: { "_id": 0 } 
            }
        ).toArray()

        res.json(comments)
    })

    app.use('/', express.static(path.join(__dirname, 'public')))
})

app.listen(80)

console.log('Listening on port 80')