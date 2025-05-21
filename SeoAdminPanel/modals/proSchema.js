let mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
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
        ref: 'subCategorys',
        required: true
    }
})

const Schema = mongoose.model('Products', ProductSchema);

module.exports = Schema