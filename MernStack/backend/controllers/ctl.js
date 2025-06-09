
const Schema = require('../modals/schema')
const fs = require('fs')
module.exports.addData = async (req, res) => {

    // console.log(req.body, req.file);
    // req.body.url = req.file.path

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

    const data = await Schema.findById(req.query.id)
    // CORS : cross-origin Resource 

    // fs.unlinkSync(data.image)
    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.json({ msg: 'Delete Data' })
    })
}
module.exports.UpadateData = async (req, res) => {

    // let data = await Schema.findById(req.query.id)
    // 
    // let img = ''
    // req.file ? img = req.file.path : img = data.image

    // req.file && fs.unlinkSync(data.image)
    // req.body.image = img
    
    await Schema.findByIdAndUpdate(req.query.id, req.body).then((data) => {
        res.json({ msg: 'upadate Data', data })
    })
}
module.exports.getSingleData = async (req, res) => {



    await Schema.findById(req.params.id).then((data) => {
        res.json({ msg: 'single Data', data })
    })
}