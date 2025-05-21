const { text } = require('express')
const mongoose = require('mongoose')

const catSchema = mongoose.Schema({

    catName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

const CatSchema = mongoose.model('Category', catSchema)

module.exports = CatSchema