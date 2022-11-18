import express from "express";
import cors from "cors";
import {  MongoClient } from "mongodb";
import dotenv from "dotenv";

import { postSignIn, postSignUp } from "./controllers/authController.js";
import { getExtract, postExtract } from "./controllers/extractController.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("Database is connected");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("my-wallet");
export const usersCollection = db.collection("users");
export const extractsCollection = db.collection("extracts");
export const sessionsCollection = db.collection("sessions");


app.post("/sign-up", postSignUp);

app.post("/sign-in", postSignIn);

app.post("/extract", postExtract);

app.get("/extract", getExtract);

app.listen(5000);

