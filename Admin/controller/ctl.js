
const schema = require("../modals/schema")

module.exports.login = (req, res) => {
    res.render('login')
}
module.exports.userAdmin = async (req, res) => {

    let admin = await schema.findOne({ email: req.body.email });

    if (admin) {
        if (req.body.password == admin.password) {
            res.cookie('admin', admin)
            res.redirect("/dashboard");
        }
        else {
            res.redirect("/")
        }
    }
    else {
        res.redirect('/')
    }

}
module.exports.logout = async (req, res) => {
    res.clearCookies('admin')
    res.redirect('/')
}
module.exports.dashboard = (req, res) => {
    if (req.cookies.admin) {

        res.render('dashboard')
    }
    else {
        res.redirect('/')
    }

}
module.exports.addAdmin = (req, res) => {

    if (req.cookies.admin) {
        res.render('addAdmin')
    }
    else {
        res.redirect('/')
    }

}
module.exports.viewAdmin = async (req, res) => {
    if (req.cookies.admin) {
        await schema.find({}).then((data) => {
            res.render('viewAdmin', { data })
        })
    }
    else {
        res.redirect('/')
    }




}
module.exports.addAdminData = async (req, res) => {

    await schema.create(req.body).then(() => {
        res.redirect('/')
    })
}
module.exports.DeleteAdminData = async (req, res) => {

    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/")
    })

}
