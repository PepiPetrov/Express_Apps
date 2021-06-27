const express = require('express')
const session = require('express-session')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'dd'
}))

module.exports = app