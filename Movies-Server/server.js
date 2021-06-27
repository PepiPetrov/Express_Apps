const express = require('express')
const body = require('body-parser')
const db = require('./db/db')
const port = 3000

const app = express()

app.use(body())
app.get('/movies', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    res.send(db.getAll())
})

app.get('/movies/:title', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const movie = db.getOne(req.params.title)
    res.setHeader('Content-Type', 'application/json')
    if (movie) {
        res.status(200)
        res.send(db.getOne(req.params.title))
    } else {
        res.status(404)
        res.send(JSON.stringify({ message: "Movie Not Found" }))
    }
})

app.post('/movies', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200)

    db.create(req.body)
    res.end()
})

app.put('/movies/:title', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const movie = db.getOne(req.params.title)
    if (movie) {
        res.status(200)
        db.edit(movie.title, req.body)
        res.end()
    } else {
        res.setHeader('Content-Type', 'application/json')
        res.status(404)
        res.send(JSON.stringify({ message: "Movie Not Found" }))
    }
})

app.delete('/movies/:title', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const movie = db.getOne(req.params.title)
    if (movie) {
        res.status(200)
        db.remove(movie.title)
        res.end()
    } else {
        res.setHeader('Content-Type', 'application/json')
        res.status(404)
        res.send(JSON.stringify({ message: "Movie Not Found" }))
    }
})

app.get('/movies/my', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(JSON.stringify(db.getMy()))
})

app.post('/users/register', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const body = req.body
    if (db.register(body.username, body.password) == 404) {
        res.setHeader('Content-Type','application/json')
        res.status(404)
        const obj = { message: 'User already registered!', code: 404 }
        res.send(JSON.stringify(obj))
        return
    }
    res.status(200)
    res.end()
})

app.post('/users/login', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const body = req.body
    if (db.login(body.username, body.password) == 404) {
        res.status(404)
        res.setHeader('Content-Type','application/json')
        const obj = { message: 'User not found!', code: 404 }
        res.send(JSON.stringify(obj))
        return
    }
    res.status(200)
    res.end()
})

app.get('/users/logout',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    db.logout()
    res.end()
})

app.delete('/users/remove',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    db.removeProfile(req.body.username,req.body.password)
})

app.get('/search/:title',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(JSON.stringify(db.search(req.params.title)))
})

app.listen(port, () => {
    console.log(port)
})