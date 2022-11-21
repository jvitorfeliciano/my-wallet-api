import { Router } from "express";
import authRouter from "./authRouter.js";
import extractRouter from "./extractRouter.js";

const router = Router();

router.use(authRouter);
router.use(extractRouter);

export default router;
