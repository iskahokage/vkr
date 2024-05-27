import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./db/db";
import router from "./routes/router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/api/v1', router)

app.listen(port, async() => {
  try {
    
    await sequelize.authenticate()
    await sequelize.sync({force: false})
    console.log(`[server]: Server is running at http://localhost:${port}`); 
  } catch (error) {
    console.log(error)
  }
});