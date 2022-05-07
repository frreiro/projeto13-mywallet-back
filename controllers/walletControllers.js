// import { ObjectId } from "mongodb";
import db from "./db.js";
import dayjs from "dayjs";

export async function getWallet(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer', "").trim();

    if (!token) res.sendStatus(401);

    try {
        // token -> objectId
        const session = await db.collection('sessions').findOne({ token });
        // _id -> user-transactions
        const userTransactions = await db.collection('transactions').find({ userId: session.userId }).toArray();

        let sum = 0;
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
        const userFinancialData = {
            userTotal: sum.toFixed(2),
            userTransactions
        }
        res.status(200).send(userFinancialData);

    } catch (e) {
        console.log('catch')
        res.sendStatus(500);

    }

}