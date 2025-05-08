
const Schema = require('../modals/schema')

module.exports.login = (req, res) => {
    res.render("login")
}
module.exports.userLogin = async (req, res) => {

    res.redirect('/dashboard')

}
module.exports.dashboard = (req, res) => {
    res.render("dashboard")
}
module.exports.userLogout = (req, res) => {
    res.redirect("/")
}
module.exports.addAdmin = (req, res) => {

    res.render("addminRegister")
}
module.exports.viewAdmin = async (req, res) => {

    await Schema.find({}).then((data) => {
        res.render("viewAdmin", { data })
    }).catch((er) => console.log(er))

}

module.exports.AddAdminData = async (req, res) => {

    await Schema.create(req.body).then(() => {
        res.redirect("/dashboard")
    }).catch((er) => console.log(er))

}

module.exports.deleteAdminData = async (req, res) => {
    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/dashboard")
    }).catch((er) => console.log(er))
}

module.exports.editAdminData = async (req, res) => {
    await Schema.findById(req.query.id).then((data) => {
        res.render("updateData", { data })
    }).catch((er) => console.log(er))
}
module.exports.updateAdminData = async (req, res) => {

    await Schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect('/dashboard')
    })
}
module.exports.profile = (req, res) => {
    res.render('profile')
}