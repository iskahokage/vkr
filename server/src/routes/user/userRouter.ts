import express, { IRouter } from "express";
import fileMiddleware from "../../middlewares/multer";
import path from "path";
import userController from "./userController";
import authMiddleware from "../../middlewares/auth";
import roleMiddleware from "../../middlewares/role";

const userRouter: IRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.post("/grs", fileMiddleware.single("pin"), userController.fetchGRS);
userRouter.get("/random", userController.getRandomUser);
userRouter.get("/:id", userController.getOne);
userRouter.use(
    "/avatar/",
    express.static(path.resolve(__dirname, "../../../", "assets/userAvatars"))
);
userRouter.patch(
    "/avatar",
    authMiddleware,
    fileMiddleware.single("avatar"),
    userController.uploadAvatar
);
userRouter.patch(
    "/update/:id",
    roleMiddleware(["admin"]),
    userController.updateUser
);
userRouter.patch(
    "/activity/:id",
    roleMiddleware(["admin"]),
    userController.activity
);
export default userRouter;
