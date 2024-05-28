import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./db/db";
import router from "./routes/router";

import bcrypt from 'bcrypt'
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
// app.use('/api/v1',express.static(path.resolve(__dirname, '../assets/userAvatars')))
app.use('/api/v1', router)

app.listen(port, async() => {
  try {
    console.log(path.resolve(__dirname, '../assets/userAvatars'))
    await sequelize.authenticate()
    await sequelize.sync({force: false})
    console.log(`[server]: Server is running at http://localhost:${port}`); 
  } catch (error) {
    console.log(error)
  }
});