const Tutorial = require('./Tutorial')
const connect = require('../../config/dbConnect')

connect()

async function getAll(type) {
    const data = await Tutorial.find({}).lean()
    if (type == 'guest') {
        data.map(x => x.enrolled = x.enrolled.length)
    }
    return data
}

async function getOne(id) {
    const data = await Tutorial.findById(id).populate('enrolled').lean()
    return data
}

async function create(tutorial) {
    if (Object.values(tutorial).includes('')) {
        throw new Error('All fields are required!')
    }
    const exists = await Tutorial.findOne({ tutorial: tutorial.title })
    if (exists) {
        throw new Error('Title should be unique!')
    } else {
        await Tutorial.create(tutorial)
    }
}

async function edit(id, newTutorial) {
    await Tutorial.findByIdAndUpdate(id, newTutorial)
}

async function remove(id) {
    await Tutorial.findByIdAndRemove(id)
}

async function enroll(id, user) {
    const tutorial = await getOne(id)
    if (tutorial.enrolled.includes(user)) {
        return
    }
    tutorial.enrolled.push(user)
    await edit(id, tutorial)
}

async function search(term) {
    const data = await getAll('user')
    return data.filter(x => x.title.includes(term))
}

module.exports = { getAll, getOne, create, edit, remove, enroll, search }