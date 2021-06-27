const validator = require('validator').default

function register(username, password, rePass) {
    const errors = []
    if (validator.isEmpty(username)) {
        errors.push('Username is required!')
        return errors
    }
    if (!validator.isLength(username, { min: 5 })) {
        errors.push('Username should be at least 5 characters long!')
        return errors
    }
    if (!validator.isAlphanumeric(username)) {
        errors.push('Username should be alphanumeric!')
        return errors
    }
    if (validator.isEmpty(password)) {
        errors.push('Password is required!')
        return errors
    }
    if (!validator.isLength(password, { min: 5 })) {
        errors.push('Password should be at least 5 characters long!')
        return errors
    }
    if (!validator.isAlphanumeric(password)) {
        errors.push('Password should be alphanumeric!')
        return errors
    }
    if (!validator.equals(password, rePass)) {
        errors.push('Both passwords should be equal!')
        return errors
    }
    return errors
}

function login(username, password) {
    const errors = []
    if (validator.isEmpty(username)) {
        errors.push('Username is required!')
        return errors
    }
    if (!validator.isLength(username, { min: 5 })) {
        errors.push('Username should be at least 5 characters long!')
        return errors
    }
    if (!validator.isAlphanumeric(username)) {
        errors.push('Username should be alphanumeric!')
        return errors
    }
    if (validator.isEmpty(password)) {
        errors.push('Password is required!')
        return errors
    }
    if (!validator.isLength(password, { min: 5 })) {
        errors.push('Password should be at least 5 characters long!')
        return errors
    }
    if (!validator.isAlphanumeric(password)) {
        errors.push('Password should be alphanumeric!')
        return errors
    }
    return errors
}

module.exports = { login, register }