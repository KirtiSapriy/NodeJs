
const passport = require('passport')
const Schema = require('../modals/schema')
const mailer = require('../middleware/mailer')

module.exports.login = (req, res) => {
    res.render("login")
}
module.exports.userLogin = async (req, res) => {
    req.flash('success', 'user login successfully !')
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
        req.flash('success', 'new Admin add successfully !')
        res.redirect("/dashboard")
    }).catch((er) => console.log(er))

}

module.exports.deleteAdminData = async (req, res) => {
    await Schema.findByIdAndDelete(req.query.id).then(() => {
        req.flash('success', 'User Data Delete!')
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
        req.flash('success', 'User Data  Update !')
        res.redirect('/dashboard')
    })
}
module.exports.profile = (req, res) => {
    res.render('profile')
}
module.exports.changePassword = (req, res) => {
    res.render('changePassword')
}

module.exports.changePass = async (req, res) => {
    let Admin = req.user

    if (Admin.password === req.body.oldPass) {
        if (Admin.password != req.body.newPass) {
            if (req.body.newPass == req.body.confPass) {
                await Schema.findByIdAndUpdate(Admin.id, { password: req.body.newPass }).then(() => {
                    res.redirect('/logout')
                })
            } else {
                req.flash('error', 'New Passsword And Confirm Password must be same !')
                res.redirect("changePassword")
            }
        } else {
            req.flash('error', "New Passsword is most be different  !")

            res.redirect("changePassword")

        }
    } else {
        req.flash('error', "Current password is not macth  !")
        res.redirect("changePassword")

    }


}


module.exports.forgotPass = (req, res) => {

    res.render('forgotPass')
}
module.exports.getOTP = async (req, res) => {

    let admin = await Schema.findOne({ email: req.body.email })
    if (!admin) {
        res.redirect('/')
    }

    let otp = Math.floor(Math.random() * 1000 + 4000)

    mailer.sendOTP(req.body.email, otp)
    req.session.AdminData = admin
    req.session.otp = otp
    res.render('resetPass')
}
module.exports.setPass = async (req, res) => {
    let Admin = req.session.AdminData
    let otp = req.session.otp

    if (otp == req.body.otp) {
        if (req.body.ConfirmPass == req.body.NewPass) {
            await Schema.findByIdAndUpdate(Admin._id, { password: req.body.ConfirmPass }).then(() => {
                res.redirect('/')
            })
        } else {
            req.flash('error', 'New Passsword And Confirm Password must be same !')
            res.redirect("/forgotPass")
        }

    } else {
        req.flash('error', "otp is not macth !")
        res.redirect("/forgotPass")

    }


}