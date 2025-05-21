let mongoose = require('mongoose')

const catSchema = mongoose.Schema({
    catName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Schema = mongoose.model('Categorys', catSchema);

module.exports = Schema