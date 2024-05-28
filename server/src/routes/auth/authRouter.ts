import express, {IRouter} from "express";
import authController from "./authController";
import tokenRefreshMiddleware from "../../middlewares/token";

const authRouter: IRouter = express.Router();

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/refresh', tokenRefreshMiddleware, authController.refreshUser)
authRouter.get('/logout', authController.logout)

export default authRouter;
