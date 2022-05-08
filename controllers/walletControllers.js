
export async function getWallet(req, res) {
    const { userTransactions, userTotal } = res.locals;

    try {
        const userFinancialData = {
            userTotal: userTotal,
            userTransactions
        }
        res.status(200).send(userFinancialData);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);

    }

}



