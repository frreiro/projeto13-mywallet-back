import bcrypt from 'bcrypt'
import db from '../db.js';


export async function signUp(req, res) {
    const { email, password, name } = req.body;

    const securePassword = bcrypt.hashSync(password, 10)
    const updatedBody = {
        name,
        email,
        password: securePassword
    }
    try {
        await db.collection('users').insertOne(updatedBody);
        res.status(201).send("Usuário cadastrado com sucesso");
    } catch (e) {
        console.log(e)
        res.status(422).send(e)
    }

}