import express, { IRouter } from "express";
import authMiddleware from "../../middlewares/auth";
import { loansController } from "./loansController";
import roleMiddleware from "../../middlewares/role";
import { loanValidation } from "../../helpers/validators";
const loansRouter: IRouter = express.Router();

loansRouter.get("/", roleMiddleware(["admin"]), loansController.getLoans);
loansRouter.get("/own", authMiddleware, loansController.getLoanById);
loansRouter.post(
    "/new",
    loanValidation,
    roleMiddleware(["admin"]),
    loansController.createLoan
);
loansRouter.patch(
    "/update/:id",
    loanValidation,
    roleMiddleware(["admin"]),
    loansController.updateLoan
);

export default loansRouter;
