
const Schema = require('../modals/catrgorySchema')
const subCatSchema = require('../modals/subCatSchema')

module.exports.addSubCategory = async (req, res) => {
    await Schema.find({}).then((data) => {

        res.render('addSubCategory', { data })
    })
}

module.exports.addSubCat = async (req, res) => {

    await subCatSchema.create(req.body).then(() => {
        res.redirect('/subCategory/addSubCat')
    })


}

module.exports.viewSubCat = async (req, res) => {
    await subCatSchema.find({}).populate('categoryId').then((data) => {
        res.render('viewSubCategory', { data })
    })


}