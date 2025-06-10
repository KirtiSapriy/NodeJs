const Schema = require('../model/productSchema')

module.exports.addData = async (req, res) => {
    await Schema.create(req.body).then(() => {
        res.json({ msg: 'data added' })
    })
}
module.exports.getData = async (req, res) => {
    await Schema.find({}).then((data) => {
        res.json({ msg: 'data Get', data })
    })
}
module.exports.deleteData = async (req, res) => {
    await Schema.findByIdAndDelete(req.query.id).then((data) => {

        res.json({ msg: 'Delete Data', data: [data] })
    })
}
module.exports.UpadateData = async (req, res) => {
    await Schema.findByIdAndUpdate(req.query.id, req.body).then((data) => {
        res.json({ msg: 'upadate Data', data })
    })
}