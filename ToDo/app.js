const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./db/db')
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index', { layout: false })
})

app.get('/catalog', (req, res) => {
    res.render('catalog', { layout: false, todos: db.getAll() })
})

app.get('/todo/:title', (req, res) => {
    const todo = db.getOne(req.params.title)
    res.render('todo', { layout: false, title: todo.title, description: todo.description, isDone: todo.isDone })
})

app.get('/edit/:title', (req, res) => {
    const todo = db.getOne(req.params.title)
    res.render('edit', { layout: false, title: todo.title, description: todo.description, isDone: todo.isDone })
})

app.post('/edit/:title', (req, res) => {
    const body = {}
    Object.entries(req.body).map(([k, v]) => body[k] = v)
    body.isDone = body.isDone == 'true' ? true : false
    db.editTodo(req.params.title, body)
    res.redirect('/todo/' + body.title)
})

app.get('/remove/:title', (req, res) => {
    db.removeTodo(req.params.title)
    res.redirect('/catalog')
})

app.get('/create', (req, res) => {
    res.render('add', { layout: false })
})

app.post('/create', (req, res) => {
    const body = {}
    Object.entries(req.body).map(([k, v]) => body[k] = v)
    body.isDone = body.isDone == 'true' ? true : false
    db.create(body)
    res.redirect('/todo/' + body.title)
})

app.get('/search', (req, res) => {
    res.render('search', { layout: false })
})

app.post('/search', (req, res) => {
    res.redirect('/search/' + req.body.title)
})

app.get('/search/:title', (req, res) => {
    const title = req.params.title
    res.render('searchResults', { layout: false, title, results: db.search(title) })
})

app.listen(port, () => {
    console.log(port)
})