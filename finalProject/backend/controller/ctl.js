
const Schema = require('../modal/schema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailer = require('../middleware/mailer')

module.exports.addUser = async (req, res) => {
    const user = await Schema.findOne({ email: req.body.email });
    if (user) {
        return res.status(200).json({ msg: 'user Alrady exited' })
    }
    req.body.password = await bcrypt.hash(req.body.password, 10)

    await Schema.create(req.body).then(() => {
        res.json({ msg: 'user Careated Successfully !!' })
    })
}


module.exports.login = async (req, res) => {
    let user = await Schema.findOne({ email: req.body.email })

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


module.exports.mangerAdd = async (req, res) => {
    const user = await Schema.findOne({ email: req.body.email });

    if (user) {
        return res.status(200).json({ msg: 'user Alrady exited' })
    }
    let password = req.body.password
    req.body.password = await bcrypt.hash(req.body.password, 10)
    req.body.adminId = req.user.id

    await Schema.create(req.body).then(() => {

        let to = req.body.email
        let subject = 'Your Deatial in compeny'
        let text = `congratulations,
         you'r our compney new manger this is your emali:${req.body.email},and password:${password} nrever send your prersonal deatial to another!`

        mailer.SendMail(to, subject, text)

        res.json({ msg: 'user Careated Successfully !!' })
    })
}
module.exports.showManager = async (req, res) => {
    const user = await Schema.find({ roal: 'manager' });

    if (!user) {
        return res.status(200).json({ msg: 'Manager Not Found !!!' })
    }

    return res.status(200).json({ msg: 'All Manager Detial', manager: user })
}
module.exports.isManagerActive = async (req, res) => {

    const manager = await Schema.findById(req.params.id);

    if (!manager) {
        return res.status(200).json({ msg: 'manager Not Found !!' })
    }

    await Schema.findByIdAndUpdate(req.params.id, { isActive: !manager.isActive }).then((data) => {

        return res.status(200).json({ msg: 'Manager Data', manager: data })
    })


}
module.exports.showEmployee = async (req, res) => {
    const user = await Schema.find({ roal: 'employee' });

    if (!user) {
        return res.status(200).json({ msg: 'Employee Not Found !!!' })
    }
    return res.status(200).json({ msg: 'All Employees Detial', employee: user })
}
module.exports.isEmployeeActive = async (req, res) => {

    const employee = await Schema.findById(req.params.id);

    if (!employee) {
        return res.status(200).json({ msg: 'employee Not Found !!' })
    }

    await Schema.findByIdAndUpdate(req.params.id, { isActive: !employee.isActive }).then((data) => {

        return res.status(200).json({ msg: 'Employee Data', Employee: data })
    })


}
