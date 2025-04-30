
const { log } = require('console')
const Schema = require('../modals/schema')
const fs = require("fs")

module.exports.pageLoad = async (req, res) => {
    await Schema.find({}).then((data) => {

        res.render('index', { data })

    }).catch(er => console.log(er))
}
module.exports.addMoviePage = (req, res) => {

    res.render('movieData')

}
module.exports.addMovieData = async (req, res) => {
    req.body.poster = req.file.path

    await Schema.create(req.body).then(() => {
        res.redirect('/')
    }).catch(er => console.log(er))
}

module.exports.deleteMovieData = async (req, res) => {

    const deleteData = await Schema.findById(req.query.id)

    fs.unlinkSync(deleteData.poster)

    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/')
    }).catch(er => console.log(er))
}

module.exports.editMovieData = async (req, res) => {

    await Schema.findById(req.query.id).then((data) => {

        res.render('editMovieData', { data })
    }).catch(er => console.log(er))
}

module.exports.updateMovieData = async (req, res) => {


    let oldData = await Schema.findById(req.body.id)

    let post = ""
    req.file ? post = req.file.path : post = oldData.poster

    req.file && fs.unlinkSync(oldData.poster)
    req.body.poster = post

    await Schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect('/')
    }).catch(er => console.log(er))
}
