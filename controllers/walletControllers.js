
import db from "../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";



export async function getTransactions(req, res) {
    const { userTransactions, userTotal } = res.locals;

    try {
        const userFinancialData = {
            userTotal: userTotal.toFixed(2),
            userTransactions
        }
        res.status(200).send(userFinancialData);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);

    }

}

export async function manipulateTransactions(req, res) {
    const { value, description } = req.body;
    const { method } = req.params;
    const { user } = res.locals;

    console.log(method);
    const date = dayjs().format('DD/MM/YYYY');
    const hour = dayjs().format('HH:mm:ss');

    try {
        // userId <-> user-transaction
        await db.collection('transactions').insertOne({
            date,
            hour,
            type: method,
            value: parseFloat(value).toFixed(2),
            description,
            userId: new ObjectId(user._id) //objectId do usuário
        });
        res.sendStatus(201);

    } catch (e) {
        res.sendStatus(500);

    }

}

export async function updateTransaction(req, res) {
    const { value, description } = req.body;
    const { id } = req.params;
    try {
        await db.collection('transactions').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    description,
                    value: parseFloat(value).toFixed(2)
                }
            });
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(500).send("Não foi possível editar o conteúdo");
    }


}


