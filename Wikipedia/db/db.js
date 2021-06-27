const fs = require('fs')
const movies = require('./wiki.json')
function getAll() {
    return Object.values(JSON.parse(fs.readFileSync(__dirname + '\\wiki.json', { encoding: 'utf8' })))
}

function getOne(name) {
    return movies[name]
}

function create(movie) {
    movies[movie['title']] = movie
    fs.writeFileSync(__dirname + '\\wiki.json', JSON.stringify(movies))
}

function edit(title, movie) {
    delete movies[title]
    create(movie)
    fs.writeFileSync(__dirname + '\\wiki.json', JSON.stringify(movies))
}

function remove(title) {
    delete movies[title]
    fs.writeFileSync(__dirname + '\\wiki.json', JSON.stringify(movies))
}

function search(title){
    return Object.values(require('./wiki.json')).filter(x=>x.title.toLocaleLowerCase().startsWith(title.toLocaleLowerCase()))
}

function searchCat(cat){
    return Object.values(require('./wiki.json')).filter(x=>x.category.toLocaleLowerCase().startsWith(cat.toLocaleLowerCase()))
}


module.exports = { getAll, getOne, create, edit, remove, search, searchCat }