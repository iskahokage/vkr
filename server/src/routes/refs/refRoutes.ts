import express, { IRouter } from "express";
import authMiddleware from "../../middlewares/auth";
import { refController } from "./refController";
const refRouter: IRouter = express.Router();

refRouter.get("/countries", authMiddleware, refController.getCountries);

export default refRouter;
