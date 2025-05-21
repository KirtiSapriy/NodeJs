const Schema = require('../modals/catSchema')

module.exports.addCat = (req, res) => {
    res.render('addCat')
}
module.exports.addCategory = async (req, res) => {

    req.body.image = req.file.path

    await Schema.create(req.body).then(() => {
        res.redirect('/category/addCat')
    }).catch((er) => console.log(er))

}

module.exports.viewCat = async (req, res) => {
    await Schema.find({}).then((data) => {
        res.render('viewCat', { data })
    })
}