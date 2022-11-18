import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/authController.js";
import signInRequestValidation from "../middlewares/signInRequestValidationMiddleware.js";
import signUpRequestValidation from "../middlewares/signUpRequestValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpRequestValidation,postSignUp);

authRouter.post("/sign-in", signInRequestValidation, postSignIn);

export default authRouter;

