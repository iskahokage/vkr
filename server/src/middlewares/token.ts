import { NextFunction, Request, Response } from "express";
import ErrorService from "../helpers/errorService";
import TokenService from "../helpers/tokenService";


const tokenRefreshMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {refreshToken} = req.cookies; 

        if(!refreshToken) {
            throw ErrorService.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        req.body.user = userData

        next()
    } catch (error) {
        next(error)
    }
}

export default tokenRefreshMiddleware