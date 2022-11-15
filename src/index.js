import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Joi from "joi";
import bcrypt from "bcrypt";

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
const usersCollection = db.collection("users");
const extractsCollection = db.collection("extracts");
const sessionsCollection = db.collection("sessions");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;
  
  const {error} = userSchema.validate({name, email, password}, {abortEarly:false});

  if(error){
    const errorMessages = error.details.map((detail)=>detail.message);
    console.log(errorMessages)
    return res.status(422).send(errorMessages);
  }

 
});

app.listen(5000);
