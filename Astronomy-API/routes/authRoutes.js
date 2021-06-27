module.exports = (app, mongoose, token) => {
    app.post('/users/register', async(req, res) => {
        await mongoose.register(req.body)
        const id = await mongoose.login(req.body)
        res.json({ token: token.createToken(id) })
        res.status(201)
        res.end()
    })

    app.post('/users/login', async(req, res) => {
        const id = await mongoose.login(req.body)
        res.json({ token: token.createToken(id) })
        res.status(200)
        res.end()
    })

    app.get('/users/logout', (req, res) => {
        res.json({ code: 200 })
        res.end()
    })
}