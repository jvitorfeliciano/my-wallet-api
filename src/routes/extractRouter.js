import { Router } from "express";
import {
  deleteExtract,
  getExtract,
  postExtract,
} from "../controllers/extractController.js";
import postExtractValidation from "../middlewares/postExtractValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";

const extractRouter = Router();

extractRouter.use(tokenValidation);

extractRouter.post("/extract", postExtractValidation, postExtract);

extractRouter.get("/extract", getExtract);

extractRouter.delete("/extract/:extractId", deleteExtract);

export default extractRouter;
