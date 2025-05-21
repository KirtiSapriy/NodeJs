const Schema = require('../modals/catSchema');
const subCatSchema = require('../modals/subCatSchema')

module.exports.addSubCat = async (req, res) => {
    await Schema.find({}).then((data) => {

        res.render('addSubCat', { data })
    })
}
module.exports.addSubCategory = async (req, res) => {
    await subCatSchema.create(req.body).then(() => {
        res.redirect('/subCategory/addSubCat')
    })
}

module.exports.viewSubCat = async (req, res) => {

    await subCatSchema.find({}).populate('CategoryId').then((data) => {
        console.log(data);
        res.render('viewSubCat', { data })
    })

}