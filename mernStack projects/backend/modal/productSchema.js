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

})
const peoductsSchema = mongoose.model('User', Schema)

module.exports = peoductsSchema