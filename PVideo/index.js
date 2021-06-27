const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongo = require('./mongo')
const app = express()
const port = 3000
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.use('/static', express.static('static'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', async (req, res) => {
    const all = await mongo.getAll()
    res.render('all', await renderOptions({ articles: all }, req))
})

app.get('/article/:id',async (req,res)=>{
    const article=await mongo.getOne(req.params.id)
    res.render('article',await renderOptions({
        _id:article._id,
        title:article.title,
        description:article.description,
        videoUrl:article.videoUrl,
        category:article.category,
        isOwner:article.creator==req.cookies.userId
    },req))
})

app.get('/edit/:id', async (req, res) => {
    const article = await mongo.getOne(req.params.id)
    res.render('edit',await renderOptions({
        _id:article._id,
        title:article.title,
        description:article.description,
        videoUrl:article.videoUrl,
        category:article.category
    },req))
})

app.post('/edit/:id', async (req, res) => {
    await mongo.edit(req.params.id,req.body)
    res.redirect('/')
})


app.get('/delete/:id', async (req, res) => {
    await mongo.remove(req.params.id)
    res.redirect('/')
})

app.get('/create', async (req, res) => {
    res.render('create', await renderOptions({}, req))
})

app.post('/create', async (req, res) => {
    const article = req.body
    article.creationDate = new Date().valueOf()
    article.creator = req.cookies.userId
    await mongo.create(article)
    res.redirect('/')
})

app.post('/search-title', async (req, res) => {
    res.redirect('/search-title/' + req.body.search)
})

app.get('/search-title/:term', async (req, res) => {
    res.render('results', await renderOptions({ results: await mongo.searchTitle(req.params.term), term: req.params.term }, req))
})

app.post('/search-cat', async (req, res) => {
    res.redirect('/search-cat/' + req.body.search)
})

app.get('/search-cat/:term', async (req, res) => {
    res.render('results', await renderOptions({ results: await mongo.searchCategory(req.params.term), term: req.params.term }, req))
})

app.get('/login', async (req, res) => {
    res.render('login', { layout: false })
})

app.post('/login', async (req, res) => {
    await mongo.login(req.body, res)
    res.redirect('/')
})

app.get('/register', async (req, res) => {
    res.render('register', await renderOptions({}, req))
})

app.post('/register', async (req, res) => {
    await mongo.register(req.body)
    await mongo.login(req.body, res)
    res.redirect('/')
})

app.get('/logout', async (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

app.listen(port, () => {
    console.log(port)
})

async function renderOptions(options, req) {
    options.layout = false
    options.isCookie = req.cookies.userId !== undefined
    options.username = await mongo.getUsername(req)
    return options
}