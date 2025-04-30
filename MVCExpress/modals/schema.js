const mongoose = require('mongoose')

let schema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    }
})

const Schema = mongoose.model('student', schema)

module.exports = Schema