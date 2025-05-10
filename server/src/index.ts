import express, { Express } from "express";
import dotenv from "dotenv";
import sequelize from "./db/db";
import router from "./routes/router";
import cookieParser from "cookie-parser";
import redisClient from "./db/redis";
import ErrorService from "./helpers/errorService";
import helmet from "helmet";
import cors from "cors";
import ErrorMiddleware from './middlewares/error'
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:4200"],
        credentials: true, 
        
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);
app.use("/api/v1", router);
app.use(ErrorMiddleware)

app.listen(port, async () => {
    try {
        await redisClient.on("error", (err) => {
            throw ErrorService.ServerInternalError(err);
        });
        await redisClient.connect();
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log(`[server]: Server is running at http://localhost:${port}`);
    } catch (error) {
        console.log(error);
    }
});
