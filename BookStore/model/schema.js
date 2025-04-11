const mongoose = require('mongoose')

const schema = mongoose.Schema({

    bookUrl: {
        type: String,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    bookPrice: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("books", schema);