module.exports = (app, mongoose, token) => {
    app.get('/data/all', async(req, res) => {
        res.status(200)
        res.json(await mongoose.getAll())
    })

    app.get('/data/object/:id', async(req, res) => {
        res.status(200)
        res.json(await mongoose.getOne(req.params.id))
    })

    app.post('/data/create', async(req, res) => {
        if (req.body.token) {
            req.body.owner = token.getId(req.body.token)
            res.status(201)
            delete req.body['token']
            const id = await mongoose.create(req.body)
            res.json({ id: id })
        } else {
            res.status(401)
        }
        res.end()
    })

    app.put('/data/edit/:id', async(req, res) => {
        if (req.body.token) {
            const userId = token.getId(req.body.token)
            const data = await mongoose.getOne(req.params.id)
            delete req.body['token']
            if (data.owner == userId) {
                res.status(200)
                await mongoose.edit(req.params.id, req.body)
                res.json({ id: req.params.id })
            } else {
                res.status(403)
            }
        } else {
            res.status(401)
        }
        res.end()
    })

    app.delete('/data/remove/:id', async(req, res) => {
        if (req.body.token) {
            const userId = token.getId(req.body.token)
            const data = await mongoose.getOne(req.params.id)
            if (data.owner == userId) {
                res.status(200)
                await mongoose.remove(req.params.id)
            } else {
                res.status(403)
            }
        } else {
            res.status(401)
        }
        res.end()
    })

    app.post('/data/search', async(req, res) => {
        const term = req.body.term
        res.status(200)
        res.json(await mongoose.search(term))
    })
}