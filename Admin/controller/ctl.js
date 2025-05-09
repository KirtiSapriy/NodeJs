
const { model } = require("mongoose");
const schema = require("../modals/schema")

module.exports.login = (req, res) => {
    res.render('login')
}
module.exports.userAdmin = async (req, res) => {
    req.flash('success', 'login success')
    res.redirect("/dashboard");
}
module.exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}
module.exports.dashboard = (req, res) => {

    res.render('dashboard')

}
module.exports.addAdmin = (req, res) => {

    res.render('addAdmin')

}
module.exports.viewAdmin = async (req, res) => {
    await schema.find({}).then((data) => {

        res.render('viewAdmin', { data })
    })

}

module.exports.addAdminData = async (req, res) => {

    await schema.create(req.body).then(() => {
        req.flash('success', 'add Admin Successfully !')
        res.redirect('/dashboard')
    })
}
module.exports.DeleteAdminData = async (req, res) => {

    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/dashboard")
    })

}

module.exports.editAdminData = async (req, res) => {
    await schema.findById(req.query.id).then((Data) => {
        req.flash('success', 'Admin Data Deleted !')
        res.render('updateAdmin', { Data })
    }).catch((er) => console.log(er))
}

module.exports.updateAdmin = async (req, res) => {

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        req.flash('success', 'Admin Data Update Successfully !')
        res.redirect('/dashboard')
    }).catch((er) => console.log(er))


}

module.exports.myProfile = (req, res) => {
    res.render('profile')
}