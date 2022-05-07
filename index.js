import express from "express";
import chalk from "chalk";
import cors from 'cors'
import dotenv from 'dotenv'
import { signUp } from "./controllers/signUpControllers.js";
import { signIn } from "./controllers/signInControllers.js";
import { getWallet } from "./controllers/walletControllers.js";
import { putMoney, removeMoney } from "./controllers/transactionsControllers.js";


const app = express();
dotenv.config();


app.use(express.json());
app.use(cors());

app.post("/signUp", signUp);

app.post("/signIn", signIn);

app.get("/wallet", getWallet)

app.post("/walletIn", putMoney);
app.post("/walletOut", removeMoney);

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
    console.log(chalk.green.bold(`Server is running on ${port}`))
})