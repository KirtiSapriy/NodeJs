
const Schema = require('../modals/catrgorySchema')

module.exports.addCategory = (req, res) => {
    res.render('addCategory')
}

module.exports.addCat = async (req, res) => {

    req.body.image = req.file.path

    await Schema.create(req.body).then(() => {
        res.redirect('/category/addCat')
    })
}

module.exports.viewCat = async (req, res) => {
    await Schema.find({}).then((data) => {

        res.render('viewCategory', { data })
    })

}