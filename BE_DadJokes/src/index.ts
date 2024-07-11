
import { configDotenv } from "dotenv";
import express, { Express, Request, Response } from "express";
import {  run } from "./mongodbConnection";

import cors from "cors";
import morgan from "morgan";


async function main(){
    configDotenv()
    const db = await run().catch(console.dir);
    if (!db) {
        throw new Error('No DB!')
    }
    const app: Express = express()
    
    const port = process.env.port && Number(process.env.port)
    app.use(cors())
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    app.get('/',(req, res)=>{
        res.send('Hello World')
    })
    
    app.get('/dadjoke',async (req,res) => {
        const collection = db.collection('dadjokes')
        try {
            console.log(collection.collectionName)
            const apiRes = await fetch(process.env.JOKE_URL??'',{headers:{Accept:"application/json"}}).then(x => x.json())
            const {id:_id,status,...rest} = apiRes
            const foundRecord = await collection.findOne({_id:_id})
            if(foundRecord) return res.json(foundRecord)
            const result = await collection.insertOne({...rest,_id})
            return  res.json(apiRes)
        } catch (error) {
            // if(error.)
            // res.send(200).json(await collection.aggregate([{ $sample: { size: 1 } }]))   
                console.error(error)
            res.status(500).json(error)
        }
    })
    
    app.listen(port,()=> console.log(`Listning on port ${port}`))
    
    module.exports = app;
}

main().then()
