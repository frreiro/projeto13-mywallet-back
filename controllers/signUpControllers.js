import joi from 'joi'
import bcrypt from 'bcrypt'
import db from './db.js';


const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(4).required()
})

export async function signUp(req, res) {
    const { email, password, name } = req.body;

    const { error } = signUpSchema.validate({ email, password, name }, { abortEarly: false });
    if (error) {
        console.log(error.details.map(detail => detail.message))
        return res.status(422).send(error);
    }


    const securePassword = bcrypt.hashSync(password, 10)
    const updatedBody = {
        name,
        email,
        password: securePassword
    }

    try {
        if (await userExist(email)) return res.status(422).send("E-mail já cadastrado");
        await db.collection('users').insertOne(updatedBody);
        res.status(201).send("Usuário cadastrado com sucesso");
    } catch (e) {
        console.log(e)
        res.status(422).send(e)
    }

}

async function userExist(email) {
    try {
        const user = await db.collection('users').findOne({ email })
        if (user) {
            return true;
        }
        return false;
    } catch (e) {
        console.log(e)
        return true;
    }
}

