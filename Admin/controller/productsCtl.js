
const Schema = require('../modals/catrgorySchema')
const subCatSchema = require('../modals/subCatSchema')
const productsSchema = require('../modals/productsSchema')

module.exports.addPro = async (req, res) => {
    await subCatSchema.find({}).then((data) => {
        res.render('addProduct', { data })
    })
}

module.exports.addProduct = async (req, res) => {
    req.body.image = req.file.path

    await productsSchema.create(req.body).then(() => {
        res.redirect('/products/addPro')
    })
}
module.exports.viewProduct = async (req, res) => {
    await productsSchema.find({}).populate({
        path: 'subCategoryId',
        populate: {
            path: 'categoryId'
        }
    }).then((data) => {
        res.render('viewProduct', { data })
    })
}