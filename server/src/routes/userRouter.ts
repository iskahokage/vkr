import express, {IRouter, Request, Response } from "express";
import UserController from "../controllers/userController";
import fileMiddleware from "../middlewares/multer";

const userRouter: IRouter = express.Router();

userRouter.post('/avatar', fileMiddleware.single('avatar'), UserController.uploadAvatar)
userRouter.post('/register', UserController.register)


export default userRouter;
