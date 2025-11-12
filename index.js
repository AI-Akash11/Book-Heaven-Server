const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yxfp204.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db('book_heaven')
    const booksCollection = db.collection('books')

    // books api

    app.get('/books',async (req, res)=>{
        const result = await booksCollection.find().toArray();
        res.send(result)
    })

    app.get('/latest-books', async(req, res)=>{
      const result = await booksCollection.find().sort({created_at: -1}).limit(6).toArray();
      res.send(result)
    })

    app.get('/books/:id', async (req, res) =>{
      const {id} =req.params;
      const objectId = new ObjectId(id);

      const result = await booksCollection.findOne({_id: objectId});
      res.send(result)
    })




    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("book heaven server is running");
});

app.listen(port, () => {
  console.log(`book heaven server listening on port ${port}`);
});
