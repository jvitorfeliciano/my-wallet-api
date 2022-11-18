import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import extractRouter from "./routes/extractRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(extractRouter);
app.use(authRouter);


app.listen(5000);

