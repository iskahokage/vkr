import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./db/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Serverasdax  ");
});

app.listen(port, async() => {
  try {
    
    await sequelize.authenticate()
    await sequelize.sync({force: false})
    console.log(`[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.log(error)
  }
});