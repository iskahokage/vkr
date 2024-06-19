import { NextFunction, Request, Response } from "express";
import { refService } from "./refService";

export const refController = {
    getCountries: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await refService.getCountries()
            return res.json(result)
        } catch (error) {
            next(error);
        }
    },
}