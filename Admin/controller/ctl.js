
const schema = require("../modals/schema")

module.exports.login = (req, res) => {
    res.render('login')
}
module.exports.userAdmin = async (req, res) => {
    res.redirect("/dashboard");
}
module.exports.logout = (req, res) => {
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
        res.redirect('/')
    })
}
module.exports.DeleteAdminData = async (req, res) => {

    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/")
    })

}

module.exports.editAdminData = async (req, res) => {
    await schema.findById(req.query.id).then((Data) => {
        res.render('updateAdmin', { Data })
    }).catch((er) => console.log(er))
}

module.exports.updateAdmin = async (req, res) => {

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect('/dashboard')
    }).catch((er) => console.log(er))


}