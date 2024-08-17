import { config } from "dotenv";
import express, { Express } from "express";
import { connectDB } from "./mongodbConnection";

import cors from "cors";
import morgan from "morgan";
import { MongoServerError, ObjectId } from "mongodb";
import bodyparser from "body-parser";
// import path from "path";

config();
const app: Express = express();
const port = process.env.port && Number(process.env.port);
app.use(cors());
app.use(bodyparser.json());
// app.use(express.static(path.join(__dirname, "public")));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.get("/", (_req, res) => {
  res.send("Hello Express");
});

app.get("/dadjoke", async (_req, res) => {
  await using db = await connectDB();
  try {
    const apiRes = await fetch(process.env.JOKE_URL?? "", {
      headers: { Accept: "application/json" },
    }).then((x) => x.json());
    const { id: _id, status, ...rest } = apiRes;
    const foundRecord = await db.collection.findOne({ _id: _id });
    if (foundRecord) return res.json(foundRecord);
    await db.collection.insertOne({ ...rest, _id });
    return res.json(apiRes);
  } catch (error: any) {
    console.dir(error);
    try {
      const data = await db.collection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();
      if (data[0] && Object.keys(data[0]).length) {
        return res.json(JSON.stringify(data[0]));
      } else {
        return res.status(500).json(error);
      }
    } catch (error) {
        console.dir(error);
      return res.status(500).json(error);
    }
  }
});

app.post('/dadjoke', async (req, res) => {
  await using db = await connectDB();
  try {
    const {_id,type, count} = req.body
    if(!req.body._id){
      res.status(400).json({
        error: '_id is required'
      })
      return 
    }
    if(!req.body.type){
      res.status(400).json({
        error: 'type is required'
      })
      return 
    }
    if(typeof req.body.count !== 'number'){
      res.status(400).json({
        error: 'count is required'
      })
      return 
    }
    const json = await db.collection.findOneAndUpdate({_id},{$set:{[type]:count}},{returnDocument:'after'})
    res.status(200).json(json)
    
  } catch (error) {
    console.log(error)
    if(error instanceof Error){
      res.sendStatus(400).json({message:error.message})    
    }else{
      res.sendStatus(500).json({message:'server error occured'})
    }
  }
})

app.get("/getAllDadJokes", async (_req, res) => {
  await using db = await connectDB();
  try {
    const foundRecord = await db.collection.find({_id:{$eq:new ObjectId('asdad')}}).sort(-1).limit(10).toArray();
    if (foundRecord) return res.json(foundRecord);
    return res.json(foundRecord);
  } catch (error: any) {
    if(error instanceof MongoServerError){
      res.json(error)
    }
    console.dir(error);
    try {
      const data = await db.collection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();
      if (data[0] && Object.keys(data[0]).length) {
        return res.json(JSON.stringify(data[0]));
      } else {
        return res.status(500).json(error);
      }
    } catch (error) {
        console.dir(error);
      return res.status(500).json(error);
    }
  }
});

app.listen(2000 || port, () => console.log(`Listning on port ${2000 || port}`));

module.exports = app;
