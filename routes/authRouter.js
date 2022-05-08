import { Router } from "express";

import { signIn } from "./../controllers/signInControllers.js"
import { signUp } from "./../controllers/signUpControllers.js";
import { userExist, comparePassword, createToken } from "../middlewares/signInMiddleware.js";
import { userAlreadyExist, joiSignUpValidate } from "../middlewares/signUpMiddleware.js";

const authRouter = Router();

authRouter.post("/signUp", joiSignUpValidate, userAlreadyExist, signUp);
authRouter.post("/signIn", userExist, comparePassword, createToken, signIn);
export default authRouter;