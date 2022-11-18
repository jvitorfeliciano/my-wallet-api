import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/authController.js";

const authRouter = Router()

authRouter.post("/sign-up", postSignUp);

authRouter.post("/sign-in", postSignIn);

export default authRouter;

