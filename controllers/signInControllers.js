
import db from "./db.js";
import bcrypt from "bcrypt";
import { v4 } from 'uuid'

export async function signIn(req, res) {
    const { email, password } = req.body;


    const token = v4();
    try {
        const user = await db.collection('users').findOne({ email })
        if (!user) return res.status(401).send('Usuário não encontrado')
        if (! await bcrypt.compare(password, user.password)) return res.status(401).send('Dados inválidos')
        if (! await createToken(token, user._id)) return res.status(401).send('Login inválido')
        res.status(200).send({
            name: user.name,
            token: token
        });
    } catch (e) {
        console.log(e)
        res.status(401);
    }
}


async function createToken(token, userId) {
    try {
        await db.collection('sessions').insertOne({
            token,
            userId
        })
        return true;
    } catch (e) {
        return false;
    }
}