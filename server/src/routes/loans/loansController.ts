import { NextFunction, Request, Response } from "express";
import { loansService } from "./loansService";
import { validationResult } from "express-validator";
import ErrorService from "../../helpers/errorService";

export const loansController = {
    getLoans: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await loansService.getLoans()
            return res.json(result)
        } catch (error) {
            next(error);
        }
    },
    getLoanById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.user;
            const result = await loansService.getLoanById(id)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    },
    createLoan: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = validationResult(req);
            if(result.isEmpty()){
                const {tool, loanDate, userId, serialNumber} = req.body; 
                const loan = await loansService.createLoan(tool, loanDate, userId, serialNumber)
                return res.json(loan)
            }
            else{
                throw ErrorService.BadRequest(result.array()[0].msg)
            }
        } catch (error) {
            next(error);
        }
    },
    updateLoan: async  (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = validationResult(req);
            if(result.isEmpty()){
                const {id} = req.params;
                const {tool, loanDate, userId, serialNumber, returnDate} = req.body; 
                const loan = await loansService.updateLoan(id, tool, loanDate, userId, serialNumber, returnDate)
                return res.json(loan)
            }
            else{
                throw ErrorService.BadRequest(result.array()[0].msg)
            }
        } catch (error) {
            next(error);
        }
    }
}