
const Schema = require('../modal/schema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mailer = require('../middleware/mailer')
module.exports.login = async (req, res) => {
    const user = await Schema.findOne({ email: req.body.email })
    if (!user) {
        return res.status(200).json({ msg: 'user Not Found !', code: 204 })
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
        let token = jwt.sign({ user }, 'mernStack', { expiresIn: '1h' });
        res.status(200).json({ msg: 'User Login Successfully !', user: user, token: token })
    } else {

        res.status(200).json({ msg: 'password is Wrong !!' })

    }
}

module.exports.profile = async (req, res) => {
    if (!req.user) {
        return res.status(404).json({ msg: 'user not Found' })
    }
    res.status(200).json({ msg: 'View Profile', user: req.user })
}

module.exports.changePassword = async (req, res) => {
    const user = req.user.user
    if (await bcrypt.compare(req.body.oldPass, user.password)) {
        if (req.body.oldPass != req.body.newPass) {
            if (req.body.newPass == req.body.confingPass) {
                req.body.newPass = await bcrypt.hash(req.body.newPass, 10)

                await Schema.findByIdAndUpdate(user._id, { password: req.body.newPass }).then(() => {
                    res.status(200).json({ msg: 'Password is Update !' })
                })
            }
            else {
                return res.status(200).json({ msg: 'New Password and Config Paaword  must be a Sema !' })
            }
        }
        else {
            return res.status(200).json({ msg: 'New Password must be a deffirent !' })
        }
    } else {
        return res.status(200).json({ msg: 'old Password is wrong!!' })


    }
}

module.exports.ForgotPass = async (req, res) => {
    let user = await Schema.findOne({ email: req.body.email })

    if (!user) {
        return res.status(200).json({ msg: 'Email Is not Find', code: 200 })
    }

    let otp = Math.floor(Math.random() * 1000 + 5000)

    let email = user.email
    let subject = 'Recover Your Account :'
    let text = `${otp} this is for verify your email and change password `

    mailer.SendMail(email, subject, text);


    let otpToken = jwt.sign({ user: user.id, otp }, 'otpCheck', { expiresIn: '5m' })

    return res.status(200).json({ msg: 'send Otp Sucsessfully !', otpToken })
}

module.exports.recoverAccount = async (req, res) => {

    let data = req.otpData
    if (req.body.newPass == req.body.confingPass) {
        req.body.newPass = await bcrypt.hash(req.body.newPass, 10)
        await Schema.findByIdAndUpdate(data.user, { password: req.body.newPass }).then(() => {
            res.status(200).json({ msg: 'Password is Update !' })
        })
    } else {
        return res.status(200).json({ msg: 'Confing Password And New Password Must be A same' })
    }
}

module.exports.employeeAdd = async (req, res) => {

    const user = await Schema.findOne({ email: req.body.email });
    if (user) {
        return res.status(200).json({ msg: 'user Alrady exited' })
    }
    let password = req.body.password
    req.body.password = await bcrypt.hash(req.body.password, 10)
    req.body.managerId = req.user.id

    await Schema.create(req.body).then(() => {

        let to = req.body.email
        let subject = 'Your Deatial in compeny'
        let text = `congratulations,
         you'r our compney new manger this is your emali:${req.body.email},and password:${password} nrever send your prersonal deatial to another!`

        mailer.SendMail(to, subject, text)

        res.json({ msg: 'user Careated Successfully !!' })
    })
}

module.exports.showEmployee = async (req, res) => {
    const user = await Schema.find({ roal: 'employee' });

    if (!user) {
        return res.status(200).json({ msg: 'Employee Not Found !!!' })
    }
    return res.status(200).json({ msg: 'All Employees Detial', employee: user })
}