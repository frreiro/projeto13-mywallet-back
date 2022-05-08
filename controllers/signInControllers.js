

export async function signIn(req, res) {
    const { user, token } = res.locals;

    try {
        res.status(200).send({
            name: user.name,
            token: token
        });
    } catch (e) {
        console.log(e)
        res.status(401);
    }
}

