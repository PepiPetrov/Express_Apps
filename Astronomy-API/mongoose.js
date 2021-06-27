const mongoose = require('mongoose')
const Article = require('./models/Object')
const User = require('./models/User')
mongoose.connect('mongodb://localhost:27017/astronomy-objects', { useNewUrlParser: true, useUnifiedTopology: true })
async function getAll() {
    const articles = await Article.find({}).select('_id title')
    return articles.map(x => x.toObject())
}
async function getOne(id) {
    return await Article.findById(id)
}

async function edit(id, newArticle) {
    await Article.findByIdAndUpdate(id, newArticle)
}

async function remove(id) {
    await Article.findByIdAndRemove(id)
}

async function create(article) {
    const data = await new Article(article).save()
    return data._id
}

async function search(term) {
    const all = await getAll()
    return all.filter(x => x.name.toLocaleLowerCase().startsWith(term.toLocaleLowerCase()))
}

async function register(user) {
    new User(user).save()
}

async function login(user) {
    const found = await User.findOne(user)
    if (found !== {} && found !== null) {
        return found._id
    }
    return undefined
}

module.exports = { getAll, getOne, edit, remove, create, search, register, login }