
const Schema = require('../modals/schema')

module.exports.login = (req, res) => {
    res.render("login")
}
module.exports.userLogin = async (req, res) => {

    let admin = await Schema.findOne({ email: req.body.email })

    if (admin) {
        if (admin.password == req.body.password) {
            res.cookie('admin', admin)
            res.redirect('/dashboard')
        }
        else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }


}
module.exports.dashboard = (req, res) => {
    if (req.cookies.admin) {
        res.render("dashboard")
    }
    else {
        res.redirect('/')
    }
}
module.exports.userLogout = (req, res) => {
    res.clearCookie('admin')
    res.redirect("/")
}
module.exports.addAdmin = (req, res) => {
    if (req.cookies.admin) {

        res.render("addminRegister")
    } else {
        res.redirect('/')
    }
}
module.exports.viewAdmin = async (req, res) => {
    if (req.cookies.admin) {

        await Schema.find({}).then((data) => {
            res.render("viewAdmin", { data })
        }).catch((er) => console.log(er))
    } else {
        res.redirect('/')
    }

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