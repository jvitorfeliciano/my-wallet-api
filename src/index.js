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

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = signupSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    console.log(errorMessages);
    return res.status(422).send(errorMessages);
  }

  try {
    const users = await usersCollection.findOne({ email });

    if (users) {
      return res.status(409).send({ message: "Usuário já cadastrado" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    await usersCollection.insertOne({
      name,
      email,
      password: encryptedPassword,
    });

    return res.status(201).send({ message: "Usuário cadastrado om sucesso" });
  } catch (err) {
    return res.status(500).send({ error: "Erro do servidor" });
  }
});

app.listen(5000);
