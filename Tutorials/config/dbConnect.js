const mongoose = require('mongoose')

async function connect() {
    await mongoose.connect('mongodb://localhost/tutorials', {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
}

module.exports = connect