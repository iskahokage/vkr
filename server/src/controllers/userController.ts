import { NextFunction, Request, Response } from 'express';
import userService from '../services/userService';
import { IUser } from '../db/models/userModel';

const userController = {

    uploadAvatar: async (req: Request, res: Response) => {
        console.log('asd')
        res.status(201)
        res.json({msg: 'Success'})
    },

    register: async (req: Request<IUser>, res: Response, next: NextFunction) => {
        try {
            const { email, password, phone, name, surname } = req.body;
            console.log(req.body)
            await userService.register({email, password, phone, name, surname});
            return res.json({ message: "User Created" });
        } catch (error) {
            next(error);
        }
    },
    
    // login: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { email, password, code, isClient } = req.body;
    //         if(!isClient){
    //             const userData = await userService.login({email, password});
    //             res.cookie("refreshToken", userData.refreshToken, {
    //                 httpOnly: true,
    //                 maxAge: 1000 * 60 * 60 * 72,
    //             });
        
    //             return res.json(userData.user);
    //         }else{
    
    //             const userData = await userService.login({code});
    //             res.cookie("refreshToken", userData.refreshToken, {
    //                 httpOnly: true,
    //                 maxAge: 1000 * 60 * 60 * 72,
    //             });
        
    //             return res.json(userData.client);
    //         }
    //     } catch (error) {
    //         next(error);
    //     }
    // },

    // refreshUser: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         if(!req.user){
    //             throw ErrorService.UnauthorizedError()
    //         }
    //         const { id } = req.user;
    //         const data = await userService.refreshUser(id);
    //         res.cookie("refreshToken", data.refreshToken, {
    //             httpOnly: true,
    //             maxAge: 1000 * 60 * 60 * 72,
    //         });
    //         return res.json(data.user);
    //     } catch (error) {
    //         next(error);
    //     }
    // },

    // logout: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         res.cookie("refreshToken", '', {
    //             httpOnly: true,
    //             maxAge: 0,
    //         });
    //         return res.json('logout')
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    
    
    

}
export default userController;