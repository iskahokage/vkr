import { NextFunction, Request, Response } from "express";
import { IUser, UserModel } from "../../db/models/userModel";
import { where } from "sequelize";
import userService from "./userService";

const userController = {
    uploadAvatar: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.user;
            const filename = req.file?.filename;
            await userService.uploadAvatar(id, filename as string);
            res.json({ msg: "Success" });
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.user; 
            const {email, name, password, phone, surname, patronymic, telegram_id, role}: IUser = req.body
            const result = await userService.updateUser(id, {email, name, password, phone, surname, patronymic, telegram_id, role})
            res.json(result)
        } catch (error) {
            next(error)
        }
    },

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.getAll()
            res.json(result)
        } catch (error) {
            next(error)
        }
    },
    getRandomUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.getRandomUser()
            res.json(result)
        } catch (error) {
            next(error)
        }
    },
    getOne: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params
            const result = await userService.getOne(id)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
};

export default userController;