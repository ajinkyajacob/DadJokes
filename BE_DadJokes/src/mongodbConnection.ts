import { configDotenv } from "dotenv";

import { Db, MongoClient, ServerApiVersion } from 'mongodb';


configDotenv()
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(process.env.mongodbURI ?? '', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export let db: Db 
export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("DB_DadJokes").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    db = client.db('DB_DadJokes')
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

