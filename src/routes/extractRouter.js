import { Router } from "express";
import {
  deleteExtract,
  getExtract,
  postExtract,
  putExtract,
} from "../controllers/extractController.js";
import postExtractValidation from "../middlewares/postExtractValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import verifyExtractExistence from "../middlewares/verifyExtractExistenceMiddleware.js";

const extractRouter = Router();

extractRouter.use(tokenValidation);

extractRouter.post("/extract", postExtractValidation, postExtract);

extractRouter.get("/extract", getExtract);

extractRouter.delete(
  "/extract/:extractId",
  verifyExtractExistence,
  deleteExtract
);

extractRouter.put("/extract/:extractId", verifyExtractExistence, putExtract);

export default extractRouter;


