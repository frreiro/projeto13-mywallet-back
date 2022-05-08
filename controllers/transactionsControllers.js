
import db from "../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function putMoney(req, res) {
    const { value, description } = req.body;
    const { user } = res.locals;

    const date = dayjs().format('DD/MM/YYYY');
    const hour = dayjs().format('HH:mm:ss');

    try {
        // userId <-> user-transaction
        await db.collection('transactions').insertOne({
            date,
            hour,
            type: "in",
            value: parseFloat(value).toFixed(2),
            description,
            userId: new ObjectId(user._id) //objectId do usuário
        });
        res.sendStatus(201);

    } catch (e) {
        res.sendStatus(500);

    }

}

export async function removeMoney(req, res) {
    const { value, description } = req.body;
    const { user } = res.locals;


    const date = dayjs().format('DD/MM/YYYY');
    const hour = dayjs().format('HH:mm:ss');

    try {
        // userId <-> user-transaction
        await db.collection('transactions').insertOne({
            date,
            hour,
            type: "out",
            value: parseFloat(value).toFixed(2),
            description,
            userId: new ObjectId(user._id) //objectId do usuário
        });
        res.sendStatus(201);

    } catch (e) {
        res.sendStatus(500);

    }

}