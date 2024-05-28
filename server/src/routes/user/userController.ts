import { Request, Response } from "express";
import { UserModel } from "../../db/models/userModel";
import { where } from "sequelize";
import userService from "./userService";

const userController = {
    uploadAvatar: async (req: Request, res: Response) => {
        console.log(req.user)
        // const {id} = req.body.user;
        const filename = req.file?.filename
        // await userService.uploadAvatar(id, filename as string)
        res.status(201);
        res.json({ msg: "Success" });
    },

    replaceAvatar: async(req: Request, res: Response) => {

    }
}

export default userController;