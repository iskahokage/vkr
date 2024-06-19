import { NextFunction, Request, Response } from "express";
import ErrorService from "../helpers/errorService";
import TokenService, { CustomJwtPayload } from "../helpers/tokenService";

const roleMiddleware = (rolesArray: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                return next(ErrorService.UnauthorizedError());
            }
            const userData = TokenService.validateAccessToken(
                token
            ) as CustomJwtPayload;
            if (!userData) {
                next(ErrorService.UnauthorizedError());
            }
            const { role } = userData;
            
            if (rolesArray.includes(role)) {
                req.user = userData;
                next();
            }
            else{
                next(ErrorService.ForbiddenError('Access denied'));
            }
        } catch (error) {
            next(ErrorService.UnauthorizedError());
        }
    };
};

export default roleMiddleware;
