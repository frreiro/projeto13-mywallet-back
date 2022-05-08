import { Router } from "express";

import { putMoney, removeMoney } from "../controllers/transactionsControllers.js";
import { getWallet } from "../controllers/walletControllers.js";
import { tokenValidate, calculateUserTotal, joiTransactionValidate } from "../middlewares/walletMiddleware.js";

const walletRouter = Router();

walletRouter.use(tokenValidate);
walletRouter.get("/wallet", calculateUserTotal, getWallet);
walletRouter.post("/walletIn", joiTransactionValidate, putMoney);
walletRouter.post("/walletOut", joiTransactionValidate, removeMoney);

export default walletRouter;