import { NextFunction, Request, Response } from "express";
import ErrorService from "../helpers/errorService";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorService) {
      return res.status(err.status).json(err.message);
    }
  
    return res.status(500).json({  message: "Internal server error"  });
  };
export default errorMiddleware