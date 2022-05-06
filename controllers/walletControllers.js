// import { ObjectId } from "mongodb";
import db from "./db.js";
import dayjs from "dayjs";

export async function wallet(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer', "").trim();

    if (!token) res.sendStatus(401);

    try {
        // token -> objectId
        const session = await db.collection('sessions').findOne({ token });
        // _id -> user-transactions
        const userTransactions = await db.collection('transactions').find({ userId: session.userId }).toArray();

        //FIXME: CALCULAR O SALDO
        let sum = 0;
        await userTransactions.forEach((transaction) => {
            const { value, type } = transaction
            if (type === "in") {
                sum += value;
            }
            else {
                sum -= value;
            }
        })
        const userFinancialData = {
            userTotal: sum,
            userTransactions
        }
        res.status(200).send(userFinancialData);

    } catch (e) {
        console.log('catch')
        res.sendStatus(500);

    }

}

export async function postWallet(req, res) {
    const { authorization } = req.headers;
    const { value, description, type } = req.body;


    const date = dayjs().format('DD/MM/YYYY');
    const hour = dayjs().format('HH:mm:ss');
    console.log(date);
    console.log(hour);


    const token = authorization?.replace('Bearer', "").trim();
    if (!token) res.sendStatus(401);
    try {
        // token -> userId
        const session = await db.collection('sessions').findOne({ token });
        // userId <-> user-transaction
        await db.collection('transactions').insertOne({
            date,
            hour,
            type, // in or out
            value,
            description,
            userId: session.userId //objectId do usuário
        });
        res.sendStatus(201);

    } catch (e) {
        res.sendStatus(500);

    }

}