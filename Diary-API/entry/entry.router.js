const router = require('express').Router()
const db = require('./mongoose')

router.get('/all', async (req, res) => {
    res.json(await db.getAll())
})

router.get('/:id', async (req, res) => {
    res.json(await db.getOne(req.params.id))
})

router.post('/create', async (req, res) => {
    await db.create(req.body)
})

router.put('/edit/:id', async (req, res) => {
    await db.edit(req.params.id, req.body)
})

router.delete('/delete/:id', async (req, res) => {
    await db.remove(req.params.id)
})

router.get('/search', async (req, res) => {
    res.json(await db.searchByTag(req.body.tag))
})


module.exports = router