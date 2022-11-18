import { Router } from "express";
import { getExtract, postExtract } from "../controllers/extractController.js";
import postExtractValidation from "../middlewares/postExtractValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";

const extractRouter = Router();

extractRouter.post(
  "/extract",
  tokenValidation,
  postExtractValidation,
  postExtract
);

extractRouter.get("/extract", tokenValidation, getExtract);

export default extractRouter;
