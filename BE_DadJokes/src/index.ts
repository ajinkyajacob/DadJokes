
import { config } from "dotenv";
import express, { Express} from "express";
import {  db, run } from "./mongodbConnection";

import cors from "cors";
import morgan from "morgan";
import path from "path";


    config()
    run().then(() => {
        if (!db) {
            throw new Error('No DB!')
        }

    }).catch(console.dir);
    const app: Express = express()
    
    const port = process.env.port && Number(process.env.port)
    app.use(cors())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    app.get('/',(_req, res)=>{
        res.send('Hello World')
    })
    
    app.get('/dadjoke',async (_req,res) => {
        const collection = db.collection('dadjokes')
        try {
            console.log(collection.collectionName)
            const apiRes = await fetch(process.env.JOKE_URL??'',{headers:{Accept:"application/json"}}).then(x => x.json())
            const {id:_id,status,...rest} = apiRes
            const foundRecord = await collection.findOne({_id:_id})
            if(foundRecord) return res.json(foundRecord)
            await collection.insertOne({...rest,_id})
            return  res.json(apiRes)
        } catch (error) {
            // if(error.)
            // res.send(200).json(await collection.aggregate([{ $sample: { size: 1 } }]))   
                console.error(error)
           return res.status(500).json(error)
        }
    })
    
    app.listen(port,()=> console.log(`Listning on port ${port}`))
    

module.exports = app;
