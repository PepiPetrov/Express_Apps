const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    enrolled: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Tutorial', schema)