import { Router } from "express";

import { getTransactions, manipulateTransactions, updateTransaction } from "../controllers/walletControllers.js";
import { tokenValidate, calculateUserTotal, joiTransactionValidate, joiParamsValidate } from "../middlewares/walletMiddleware.js";

const walletRouter = Router();

walletRouter.use(tokenValidate);
walletRouter.get("/wallet", calculateUserTotal, getTransactions);
walletRouter.post("/wallet/:method", joiParamsValidate, joiTransactionValidate, manipulateTransactions);
walletRouter.put("/wallet/update/:id", updateTransaction)

export default walletRouter;