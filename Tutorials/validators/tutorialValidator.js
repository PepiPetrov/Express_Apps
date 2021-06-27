const validator = require('validator').default

function validate(title, description, imageUrl) {
    const errors = []
    if (validator.isEmpty(title)) {
        errors.push('Title is required!')
        return errors
    }
    if (!validator.isLength(title, { min: 4 })) {
        errors.push('Title must be at least 4 characters long!')
        return errors

    }
    if (validator.isEmpty(description)) {
        errors.push('Description is required!')
        return errors

    }
    if (!validator.isLength(title, { min: 20, max: 50 })) {
        errors.push('Description must be between 20 and 50 characters!')
        return errors

    }
    if (!validator.matches(imageUrl, /^https?$/)) {
        errors.push('Image URL must be a valid URL!')
        return errors
    }
}

module.exports = validate