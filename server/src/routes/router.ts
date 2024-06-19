import express, {IRouter, Request, Response } from "express";
import authRouter from "./auth/authRouter";
import userRouter from "./user/userRouter";
import refRouter from "./refs/refRoutes";

const router: IRouter = express.Router();


router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/ref', refRouter)

export default router;
