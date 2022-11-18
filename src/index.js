import express from "express";
import cors from "cors";
import {  MongoClient } from "mongodb";
import dotenv from "dotenv";
import extractRouter from "./routes/extractRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(extractRouter);
app.use(authRouter);

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

app.listen(5000);

