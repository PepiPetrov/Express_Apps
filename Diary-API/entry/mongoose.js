const mongoose = require('mongoose')
const Entry = require('./Entry')

mongoose.connect('mongodb://localhost/diary-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

async function getAll() {
    return await Entry.find({})
}

async function getOne(id) {
    return await Entry.findById(id)
}

async function create(entry) {
    await Entry.create(entry)
}

async function edit(id, entry) {
    await Entry.findByIdAndUpdate(id, entry)
}

async function remove(id) {
    await Entry.findByIdAndRemove(id)
}

async function searchByTag(tag) {
    return await Entry.find({ tag })
}

module.exports = { getAll, getOne, create, edit, remove, searchByTag }