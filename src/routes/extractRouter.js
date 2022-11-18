import { Router } from "express";
import { getExtract, postExtract } from "../controllers/extractController.js";

const extractRouter = Router();

extractRouter.post("/extract", postExtract);

extractRouter.get("/extract", getExtract);

export default extractRouter;