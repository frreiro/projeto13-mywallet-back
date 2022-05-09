import db from "../db.js";
import joi from "joi";



export async function joiSignUpValidate(req, res, next) {
    const { email, password, name } = req.body;

    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().alphanum().min(4).required()
    })


    const { error } = signUpSchema.validate({ email, password, name }, { abortEarly: false });
    if (error) {
        console.log(error.details.map(detail => detail.message));
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    next();

}

export async function userAlreadyExist(req, res, next) {
    const { email } = req.body;

    try {
        const user = await db.collection('users').findOne({ email })
        if (user) return res.status(401).send('Usuário não encontrado')
    } catch (e) {
        res.sendStatus(500);
    }
    next();
}

