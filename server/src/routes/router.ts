import express, {IRouter, Request, Response } from "express";
import authRouter from "./auth/authRouter";
import userRouter from "./user/userRouter";
import refRouter from "./refs/refRoutes";
import loansRouter from "./loans/loansRouter";

const router: IRouter = express.Router();


router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/ref', refRouter)
router.use('/loans', loansRouter)

export default router;
