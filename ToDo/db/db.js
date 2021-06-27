const fs = require('fs')

function getAll() {
    return require('./todos.json')
}

function getOne(title){
    return require('./todos.json').find(x=>x.title==title)
}

function editTodo(title,newTodo){
    const index=require('./todos.json').findIndex(x=>x.title==title)
    const todos=require('./todos.json')
    todos[index]=newTodo
    fs.writeFileSync(__dirname+'\\todos.json',JSON.stringify(todos))
}

function removeTodo(title){
    const index=require('./todos.json').findIndex(x=>x.title==title)
    const todos=require('./todos.json')
    todos.splice(index,1)
    fs.writeFileSync(__dirname+'\\todos.json',JSON.stringify(todos))
}

function create(todo){
    const todos=require('./todos.json')
    todos.push(todo)
    fs.writeFileSync(__dirname+'\\todos.json',JSON.stringify(todos))   
}

function search(title){
    return require('./todos.json').filter(x=>x.title.toLocaleLowerCase().startsWith(title.toLocaleLowerCase()))
}

module.exports = { getAll, getOne, editTodo, removeTodo, create, search }