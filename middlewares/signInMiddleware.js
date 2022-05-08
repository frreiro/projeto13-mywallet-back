import db from "../db.js";
import bcrypt from "bcrypt";
import { v4 } from 'uuid'

export async function userExist(req, res, next) {
    const { email } = req.body;

    try {
        const user = await db.collection('users').findOne({ email })
        if (!user) return res.status(401).send('Usuário não encontrado')
        res.locals.user = user;
    } catch (e) {
        res.sendStatus(500);
    }
    next();
}


export async function comparePassword(req, res, next) {
    const { password } = req.body;
    const { user } = res.locals;


    if (!bcrypt.compare(password, user.password)) {
        return res.status(401).send('Dados inválidos')
    }
    next();
}

export async function createToken(req, res, next) {
    const { user } = res.locals;
    const token = v4();

    try {
        await db.collection('sessions').insertOne({
            token,
            userId: user._id
        })

        res.locals.token = token;
    } catch (e) {
        console.log(e);
        res.status(401).send('Não foi possível criar o token')

    }
    next();
}