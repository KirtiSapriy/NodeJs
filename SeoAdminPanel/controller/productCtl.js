const Schema = require('../modals/catSchema');
const subCatSchema = require('../modals/subCatSchema')
const productSchema = require('../modals/proSchema')


module.exports.addpro = async (req, res) => {
    await subCatSchema.find({}).then((data) => {
        res.render('addProducts', { data })
    })
}
module.exports.addProducts = async (req, res) => {

    req.body.image = req.file.path



    await productSchema.create(req.body).then(() => {
        res.redirect('/products/addPro')
    })
}

module.exports.viewProducts = async (req, res) => {

    await subCatSchema.find({}).populate('CategoryId').then((data) => {
        console.log(data);
        res.render('viewSubCat', { data })
    })

}