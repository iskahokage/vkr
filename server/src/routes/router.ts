import express, {IRouter, Request, Response } from "express";
import userController from "../controllers/userController";
import userRouter from "./userRouter";

const router: IRouter = express.Router();


router.use('/user', userRouter)

export default router;
