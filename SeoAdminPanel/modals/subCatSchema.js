let mongoose = require('mongoose')

const SubCatSchema = mongoose.Schema({
    subCatName: {
        type: String,
        required: true
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorys',
        required: true
    }
})

const Schema = mongoose.model('subCategorys', SubCatSchema);

module.exports = Schema