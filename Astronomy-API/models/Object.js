const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    type: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Object', schema)