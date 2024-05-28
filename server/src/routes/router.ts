import express, {IRouter, Request, Response } from "express";
import authRouter from "./auth/authRouter";
import userRouter from "./user/userRouter";

const router: IRouter = express.Router();


router.use('/auth', authRouter)
router.use('/user', userRouter)

export default router;
