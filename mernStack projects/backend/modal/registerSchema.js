const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const registrSchema = mongoose.model('User', Schema)

module.exports = registrSchema