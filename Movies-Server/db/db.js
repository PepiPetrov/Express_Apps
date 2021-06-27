const fs = require('fs')
const movies = require('./movies.json')
const users = require('./users.json')
let logged = require('./login.json')

function getAll() {
    return JSON.stringify(Object.values(JSON.parse(fs.readFileSync(__dirname + '\\movies.json', { encoding: 'utf8' }))))
}

function getOne(name) {
    return movies[name]
}

function create(movie) {
    movie.owner = Object.keys(logged)[0]
    movies[movie['title']] = movie
    fs.writeFileSync(__dirname + '\\movies.json', JSON.stringify(movies))
}

function edit(title, movie) {
    delete movies[title]
    create(movie)
    fs.writeFileSync(__dirname + '\\movies.json', JSON.stringify(movies))
}

function remove(title) {
    delete movies[title]
    fs.writeFileSync(__dirname + '\\movies.json', JSON.stringify(movies))
}

function getMy() {
    const my = Object.values(movies).filter(x => x.owner == Object.keys(logged)[0])
    return my
}

function register(username, password) {
    if (!users.hasOwnProperty(username)) {
        users[username] = { username, password }
        fs.writeFileSync(__dirname + '\\users.json', JSON.stringify(users))
        login(username, password)
    } else {
        return 404
    }
}

function login(username, password) {
    if (users[username] !== undefined && users[username].password == password) {
        logged = {}
        logged[username] = users[username]
        fs.writeFileSync(__dirname + '\\login.json', JSON.stringify(logged))
    } else {
        return 404
    }
}

function logout() {
    logged={}
    fs.writeFileSync(__dirname + '\\login.json', JSON.stringify({}))
}

function removeProfile(username, password) {
    logout()
    for (const key in users) {
        if (users[key].username == username && users[key].password == password) {
            delete users[username]
            break
        }
    }
    fs.writeFileSync(__dirname + '\\users.json', JSON.stringify(users))
    getMy().map(x => remove(x.title))
}

function search(title) {
    return Object.values(require('./wiki.json')).filter(x => x.title.toLocaleLowerCase().startsWith(title.toLocaleLowerCase()))
}

module.exports = { getAll, getOne, create, edit, remove, register, login, logout, getMy, removeProfile, search }