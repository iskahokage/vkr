import { NextFunction, Request, Response } from "express"
import ErrorService from "../helpers/errorService"
import TokenService from "../helpers/tokenService"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) =>{
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        
        if(!token){
            return next(ErrorService.UnauthorizedError())
        }
        const userData = TokenService.validateAccessToken(token)
        if(!userData){
            next(ErrorService.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (error) {
        next(ErrorService.UnauthorizedError())
    }
}

export default authMiddleware;