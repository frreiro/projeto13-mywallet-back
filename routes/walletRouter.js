import { Router } from "express";

import { deleteTransaction, getTransactions, manipulateTransactions, updateTransaction } from "../controllers/walletControllers.js";
import { tokenValidate, calculateUserTotal, joiTransactionValidate, joiMethodValidate, idExist } from "../middlewares/walletMiddleware.js";

const walletRouter = Router();

walletRouter.use(tokenValidate);
walletRouter.get("/wallet", calculateUserTotal, getTransactions);
walletRouter.post("/wallet/:method", joiMethodValidate, joiTransactionValidate, manipulateTransactions);
walletRouter.put("/wallet/:id", joiTransactionValidate, idExist, updateTransaction)
walletRouter.delete("/wallet/:id", idExist, deleteTransaction)


export default walletRouter;