const mongoose = require('mongoose')

const schema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

const dataSchema = mongoose.model('data', schema)

module.exports = dataSchema