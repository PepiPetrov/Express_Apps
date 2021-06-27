const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    tag: String
})

module.exports = mongoose.model('Entry', schema)