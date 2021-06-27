const router = require('express').Router()
const isAuth = require('../middlewares/isAuth')
const hbsContext = require('../util/hbsContext')
const service = require('./service/tutorialService')
const tutorialValidator = require('../validators/tutorialValidator')

router.get('/', async (req, res) => {
    if (req.cookies.user) {
        const data = await service.getAll('user')
        res.render('home/user', hbsContext({ courses: data }, true, req.cookies.user.username))
    }
    res.render('home/guest', hbsContext({ courses: await service.getAll() }, false))
})

router.get('/details/:id', isAuth, async (req, res) => {
    const course = await service.getOne(req.params.id)
    course.isUser = req.cookies.user
    course.isOwner = course.owner == req.cookies.user._id
    course.isEnrolled = course.enrolled.find(x => x._id == req.cookies.user._id)
    res.render('course/details', hbsContext({ course }, true, req.cookies.user.username))
})

router.get('/create', isAuth, (req, res) => {
    res.render('course/create')
})

router.post('/create', isAuth, async (req, res) => {
    const errors = tutorialValidator(req.body.title, req.body.description, req.body.imageUrl)
    try {
        req.body.createdAt = new Date().toDateString()
        req.body.owner = req.cookies.user._id
        req.body.enrolled = []
        await service.create(req.body)
        res.redirect('/')
    } catch (e) {
        errors.push(e.message)
    }
    if (errors.length > 0) {
        res.render('course/create', hbsContext({ error: errors.join('\n') }, true, req.cookies.user.username))
    }
})

router.get('/delete/:id', isAuth, async (req, res) => {
    await service.remove(req.params.id)
    res.redirect('/')
})

router.get('/edit/:id', isAuth, async (req, res) => {
    const data = await service.getOne(req.params.id)
    res.render('course/edit', hbsContext({ data }, true, req.cookies.user.username))
})

router.post('/edit/:id', isAuth, async (req, res) => {
    const id = req.params.id
    const errors = tutorialValidator(req.body.title, req.body.description, req.body.imageUrl)
    try {
        req.body.img = req.body.imageUrl
        await service.edit(id, req.body)
        res.redirect('/')
    } catch (e) {
        errors.push(e.message)
    }
    if (errors.length > 0) {
        res.render('course/edit', hbsContext({ error: errors.join('\n'), data: await service.getOne(id) }, true, req.cookies.user.username))
    }
})

router.get('/enroll/:id', async (req, res) => {
    await service.enroll(req.params.id, req.cookies.user._id)
    res.redirect('/')
})

router.get('/search', async (req, res) => {
    res.render('home/user', hbsContext({ courses: await service.search(req.body.term) }))
})

module.exports = router