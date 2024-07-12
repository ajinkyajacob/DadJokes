import { config } from "dotenv";
import express, { Express } from "express";
import { connectDB } from "./mongodbConnection";

import cors from "cors";
import morgan from "morgan";
// import path from "path";

config();
const app: Express = express();
const port = process.env.port && Number(process.env.port);
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.get("/", (_req, res) => {
  res.send("Hello Express");
});

app.get("/dadjoke", async (_req, res) => {
  const { db, close } = await connectDB();
  const collection = db.collection("dadjokes");
  try {
    console.log(collection.collectionName);
    const apiRes = await fetch(process.env.JOKE_URL?? "", {
      headers: { Accept: "application/json" },
    }).then((x) => x.json());
    const { id: _id, status, ...rest } = apiRes;
    const foundRecord = await collection.findOne({ _id: _id });
    if (foundRecord) return res.json(foundRecord);
    await collection.insertOne({ ...rest, _id });
    close();
    return res.json(apiRes);
  } catch (error: any) {
    console.dir(error);
    try {
      const data = await collection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();
      close();
      if (data[0] && Object.keys(data[0]).length) {
        return res.json(JSON.stringify(data[0]));
      } else {
        return res.status(500).json(error);
      }
    } catch (error) {
        console.dir(error);
        close();
      return res.status(500).json(error);
    }
  }
});

app.listen(2000 || port, () => console.log(`Listning on port ${2000 || port}`));

module.exports = app;
