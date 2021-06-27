const express = require('express')
const hbs = require('express-handlebars')
const cookie = require('cookie-parser')

const app = express()

app.use(express.urlencoded({ extended: false }))

app.use('/static', express.static('static'))

app.engine('hbs', hbs({
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.use(cookie('tutorials'))

module.exports = app