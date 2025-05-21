const mongoose = require('mongoose')

const Schema = mongoose.Schema({

    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory',
        required: true
    },
})

const productsSchema = mongoose.model('Products', Schema)
module.exports = productsSchema