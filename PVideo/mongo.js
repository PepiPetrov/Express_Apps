const mongoose = require('mongoose')
const Article = require('./models/Video')
const User = require('./models/User')
mongoose.connect('mongodb://localhost:27017/videos', { useNewUrlParser: true, useUnifiedTopology: true })

async function getAll() {
    const articles = await Article.find({}).sort({creationDate:-1})
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
    await new Article(article).save()
}

async function searchTitle(term) {
    const all = await getAll()
    return all.filter(x => x.title.toLocaleLowerCase().startsWith(term.toLocaleLowerCase()))
}

async function searchCategory(term) {
    const all = await getAll()
    return all.filter(x => x.category.toLocaleLowerCase().startsWith(term.toLocaleLowerCase()))
}

async function register(user) {
    new User(user).save()
}

async function login(user, res) {
    const found = await User.findOne(user)
    if (found !== {} && found !== null) {
        res.cookie("userId", found._id)
    }
}

async function getUsername(req) {
    if ((await User.findById(req.cookies.userId)) == null) {
        return ''
    }
    return (await User.findById(req.cookies.userId)).username
}

module.exports = { getAll, getOne, edit, remove, create, searchTitle, searchCategory, register, login, getUsername }
