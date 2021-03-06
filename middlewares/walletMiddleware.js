import { ObjectId } from "mongodb";
import joi from "joi";

import db from "../db.js";


export async function tokenValidate(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', "").trim();
    if (!token) res.sendStatus(401);

    try {
        // token -> sessão
        const session = await db.collection('sessions').findOne({ token });
        // sessão -> user
        const user = await db.collection('users').findOne({ _id: new ObjectId(session.userId) });
        if (!user) return res.status(401).send("Usuário não existe");

        // salva user
        res.locals.user = user;

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }

    next();
}


export async function calculateUserTotal(req, res, next) {
    const user = res.locals.user;

    try {
        const userTransactions = await db.collection('transactions').find({
            userId: new ObjectId(user._id)
        }).toArray();

        let sum = 0
        await userTransactions.forEach((transaction) => {
            const { value: oldValue, type } = transaction
            const value = parseFloat(oldValue)
            if (type === "in") {
                sum += value;
            }
            else {
                sum -= value;
            }
        })

        res.locals.userTransactions = userTransactions.reverse();
        res.locals.userTotal = sum;

    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao realizar o calculo do saldo");
    }
    next();
}


export async function joiTransactionValidate(req, res, next) {
    const body = req.body;

    const flowSchema = joi.object({
        value: joi.string().required(),
        description: joi.string().required()
    })

    const { error } = flowSchema.validate(body, { abortEarly: false });
    if (error) return res.status(401).send("Dados incompletos")
    next();
}

export async function joiMethodValidate(req, res, next) {
    const { method } = req.params;

    const methodSchema = joi.string().valid("in", "out").required();
    const { error } = methodSchema.validate(method);
    if (error) return res.status(401).send("Método inválido");
    next();
}

export async function idExist(req, res, next) {
    const { id } = req.params;
    if (!id) res.sendStatus(500);
    try {
        const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(id) });
        if (!transaction) res.status(404).send("Transação não existe");
    } catch (e) {
        console.log(e);
        res.status(500).send("Não foi possível editar o conteúdo");
    }
    next();
}