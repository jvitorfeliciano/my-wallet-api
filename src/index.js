import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import Joi from "joi"
import bcrypt from "bcrypt"

dotenv.config();
const app =  express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

try{
    await mongoClient.connect();
    console.log('Database is connected');
}catch(err){
   console.log(err)
}

const db = mongoClient.db('my-wallet');
const usersCollection = db.collection("users");
const extractsCollection = db.collection("extracts");
const sessionsCollection = db.collection("sessions");
app.listen(5000);