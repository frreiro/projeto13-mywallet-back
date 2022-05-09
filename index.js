import express from "express";
import chalk from "chalk";
import cors from 'cors'
import dotenv from 'dotenv'


import authRouter from "./routes/authRouter.js";
import walletRouter from "./routes/walletRouter.js";


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());


app.use(authRouter);
app.use(walletRouter);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.green.bold(`Server is running on ${port}`))
})