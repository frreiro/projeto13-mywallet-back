import express from "express";
import chalk from "chalk";
import cors from 'cors'
import dotenv from 'dotenv'
import { signUp } from "./Controllers/signUp.js";
import { signIn } from "./Controllers/signIn.js";

const app = express();
dotenv.config();


app.use(express.json());
app.use(cors());

app.post("/signUp", signUp);

app.post("/signIn", signIn);

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
    console.log(chalk.green.bold(`Server is running on ${port}`))
})