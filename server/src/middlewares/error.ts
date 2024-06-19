import { NextFunction, Request, Response } from "express";
import ErrorService from "../helpers/errorService";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorService) {
      return res.status(err.status).json(err.message);
    }
  
    return res.status(500).json({  err: err.message  });
  };
export default errorMiddleware