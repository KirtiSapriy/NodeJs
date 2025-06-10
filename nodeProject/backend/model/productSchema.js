const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

const productSchema = mongoose.model('products', Schema)

module.exports = productSchema