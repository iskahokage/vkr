import express, { IRouter } from "express"
import fileMiddleware from "../../middlewares/multer";
import path from "path";
import userController from "./userController";
import authMiddleware from "../../middlewares/auth";

const userRouter: IRouter = express.Router();

userRouter.use('/avatar', express.static(path.resolve(__dirname, '../../../','assets/userAvatars')))
userRouter.post('/avatar', authMiddleware, fileMiddleware.single('avatar'), userController.uploadAvatar)
userRouter.post('/avatar-replace', authMiddleware, fileMiddleware.single('avatar'), userController.replaceAvatar)
export default userRouter;