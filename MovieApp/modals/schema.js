const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
})

const Schema = mongoose.model('movies', schema)

module.exports = Schema