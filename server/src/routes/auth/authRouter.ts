import express, {IRouter} from "express";
import authController from "./authController";
import tokenRefreshMiddleware from "../../middlewares/token";
import authMiddleware from "../../middlewares/auth";

const authRouter: IRouter = express.Router();

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/refresh', tokenRefreshMiddleware, authController.refreshUser)
authRouter.get('/logout', authController.logout)
authRouter.patch('/password', authMiddleware, authController.changePassword)

export default authRouter;
