const User = require('./User')
const connect = require('../../config/dbConnect')

connect()

async function login(user) {
    const exists = await User.findOne({ username: user.username, password: user.password })
    if (exists) {
        return exists
    }
    throw new Error('User not found!')
}


async function register(user) {
    if (Object.values(user).includes('')) {
        throw new Error('All fields are required!')
    }
    const exists = await User.findOne({ username: user.username, password: user.password })
    if (exists) {
        throw new Error('Username should be unique!')
    } else {
        await User.create(user)
        return await login(user)
    }
}


module.exports = { register, login }