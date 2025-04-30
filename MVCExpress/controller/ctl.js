
const schema = require('../modals/schema')

module.exports.firstPage = async (req, res) => {
    await schema.find({}).then((data) => res.render('index', { data }))
        .catch((er) => console.log(er))


}

module.exports.addData = async (req, res) => {

    await schema.create(req.body).then(() => res.redirect('/'))
        .catch((er) => console.log(er))

}
module.exports.deleteData = async (req, res) => {


    await schema.findByIdAndDelete(req.query.id).then(() => res.redirect('/'))
        .catch((er) => console.log(er))

}
module.exports.editData = async (req, res) => {
    schema.findById(req.query.id).then((singleData) => res.render('edit', { singleData }))
        .catch(er => console.log(er))


}
module.exports.updateData = async (req, res) => {

    console.log(req.body);

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => res.redirect('/'))
        .catch(er => console.log(er))

}