const router = require('express').Router()
const isGuest = require('../middlewares/isGuest')
const service = require('./service/authService')
const authValidators = require('../validators/authValidator')

router.get('/register', isGuest, (req, res) => {
    res.render('user/register')
})

router.post('/register', async (req, res) => {
    const errors = authValidators.register(req.body.username, req.body.password, req.body.rePassword)
    try {
        const user = await service.register(req.body)
        res.cookie('user', user)
    } catch (e) {
        errors.push(e.message)
    }
    if (errors.length > 0) {
        res.render('user/register', { error: errors.join('\n') })
    }
    res.redirect('/')
})
router.get('/login', isGuest, (req, res) => {
    res.render('user/login')
})

router.post('/login', isGuest, async (req, res) => {
    try {
        const user = await service.login({ username: req.body.username, password: req.body.password })
        res.cookie('user', user)
    } catch (e) {
        res.render('user/login', { error: e.message })
    }
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    res.clearCookie('user')
    res.redirect('/')
})

module.exports = router