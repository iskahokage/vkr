import { NextFunction, Request, Response } from "express";
import authService from "./authService";
import { IUser } from "../../db/models/userModel";
import ErrorService from "../../helpers/errorService";
import { validationResult } from "express-validator";

const authController = {
    register: async (req: Request<any, any, IUser>, res: Response, next: NextFunction) => {
        try {
            const result = validationResult(req);

            console.log(result)
            
            if(result.isEmpty()){
                const { email, password, phone, name, surname, address, tin } = req.body;
                await authService.register({ email, password, phone, name, surname, address, tin });
                return res.json({ message: "User Created" });
            }
            else{
                throw ErrorService.BadRequest(result.array()[0].msg)
            }
        } catch (error) {
            next(error);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const userData = await authService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 72,
            });
            return res.json(userData.user);
        } catch (error) {
            next(error);
        }
    },

    refreshUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.body) {
                throw ErrorService.UnauthorizedError();
            }
            const { id } = req.body;
            const data = await authService.refreshUser(id);
            if (data) {
                res.cookie("refreshToken", data.refreshToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 72,
                });
                return res.json(data.user);
            }
        } catch (error) {
            next(error);
        }
    },

    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.cookie("refreshToken", "", {
                httpOnly: true,
                maxAge: 0,
            });
            return res.json("logout");
        } catch (error) {
            next(error);
        }
    },

    changePassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { oldPassword, password, confirmPassword } = req.body;

            const { id } = req.user;

            await authService.changePassword(oldPassword, password, confirmPassword, id);
            res.json("Пароль изменен");
        } catch (error) {
            next(error);
        }
    },
};
export default authController;
