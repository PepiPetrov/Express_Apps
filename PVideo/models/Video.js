const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    creationDate: Number,
    videoUrl: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Video', schema)