import express, { IRouter } from "express";
import authController from "./authController";
import tokenRefreshMiddleware from "../../middlewares/token";
import authMiddleware from "../../middlewares/auth";
import { body } from "express-validator";
import { registerValidation } from "../../helpers/validators";
import roleMiddleware from "../../middlewares/role";
const authRouter: IRouter = express.Router();

authRouter.get("/refresh", tokenRefreshMiddleware, authController.refreshUser);
authRouter.post(
    "/register",
    registerValidation,
    roleMiddleware(['admin']),
    authController.register
);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);
authRouter.patch("/password", authMiddleware, authController.changePassword);

export default authRouter;
