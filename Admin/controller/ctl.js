
const schema = require("../modals/schema")
const mailer = require('../middleware/mailre')
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

module.exports.changepass = (req, res) => {
    res.render('changePass')
}
module.exports.changePass = async (req, res) => {
    let admin = req.user;
    if (admin.password == req.body.oldPass) {
        if (req.body.oldPass != req.body.newPassword) {
            if (req.body.newPassword == req.body.confirmPassword) {


                await schema.findByIdAndUpdate(admin.id, { password: req.body.newPassword }).then(() => {
                    res.redirect('/logout')
                })
            } else {
                req.flash('error', 'new password or confirm password most be seam !')
                res.redirect('/changePass')
            }
        } else {
            req.flash('error', 'new Password not allow !')
            res.redirect('/changePass')
        }
    } else {
        req.flash('error', 'Old Password is Not Matched!')
        res.redirect('/changePass')
    }
}
module.exports.recoverUser = async (req, res) => {

    let admin = await schema.findOne({ email: req.body.email })
    if (!admin) {
        res.redirect('/')
    }
    let otp = Math.floor(Math.random() * 10000 + 50000)

    mailer.sendOTP(req.body.email, otp)
    req.session.adminData = admin;
    req.session.otp = otp
    res.render('verifyOtp')

}
module.exports.VerifyOtp = async (req, res) => {
    let admin = req.session.adminData;
    let otp = req.session.otp;


    if (otp == req.body.otp) {
        if (req.body.newPassword == req.body.confirmPassword) {
            await schema.findByIdAndUpdate(admin._id, { password: req.body.newPassword }).then(() => {
                res.redirect('/')
            })
        } else {
            req.flash('error', 'new password and confirm password not same !')
        }
    } else {
        res.redirect('/')
    }

}