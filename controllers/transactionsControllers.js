
import db from "./db.js";
import dayjs from "dayjs";

export async function putMoney(req, res) {
    const { authorization } = req.headers;
    const { value, description } = req.body;

    //TODO: JOI VALIDAÇÃO BODY

    const date = dayjs().format('DD/MM/YYYY');
    const hour = dayjs().format('HH:mm:ss');

    const token = authorization?.replace('Bearer', "").trim();
    if (!token) res.sendStatus(401);
    try {
        // token -> userId
        const session = await db.collection('sessions').findOne({ token });
        // userId <-> user-transaction
        await db.collection('transactions').insertOne({
            date,
            hour,
            type: "in", // in or out
            value: parseFloat(value).toFixed(2),
            description,
            userId: session.userId //objectId do usuário
        });
        res.sendStatus(201);

    } catch (e) {
        res.sendStatus(500);

    }

}

export async function removeMoney(req, res) {
    const { authorization } = req.headers;
    const { value, description } = req.body;

    //TODO: JOI VALIDAÇÃO BODY

    const date = dayjs().format('DD/MM/YYYY');
    const hour = dayjs().format('HH:mm:ss');

    const token = authorization?.replace('Bearer', "").trim();
    if (!token) res.sendStatus(401);
    try {
        // token -> userId
        const session = await db.collection('sessions').findOne({ token });
        // userId <-> user-transaction
        await db.collection('transactions').insertOne({
            date,
            hour,
            type: "out", // in or out
            value: parseFloat(value).toFixed(2),
            description,
            userId: session.userId //objectId do usuário
        });
        res.sendStatus(201);

    } catch (e) {
        res.sendStatus(500);

    }

}