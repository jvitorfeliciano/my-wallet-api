import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/authController.js";
import signInValidation from "../middlewares/signInValidationMiddleware.js";
import signUpValidation from "../middlewares/signUpValidationMiddleware.js";


const authRouter = Router();


authRouter.post("/sign-up",signUpValidation, postSignUp);

authRouter.post("/sign-in",signInValidation, postSignIn);

export default authRouter;

