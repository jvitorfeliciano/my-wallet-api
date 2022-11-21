import { Router } from "express";
import deleteSession, {
  postSignIn,
  postSignUp,
} from "../controllers/authController.js";
import signInValidation from "../middlewares/signInValidationMiddleware.js";
import signUpValidation from "../middlewares/signUpValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpValidation, postSignUp);

authRouter.post("/sign-in", signInValidation, postSignIn);

authRouter.delete("/delete-session", tokenValidation, deleteSession);
export default authRouter;


