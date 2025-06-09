
const Schema = require('../modal/registerSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.addUser = async (req, res) => {
    const user = await Schema.findOne({ email: req.body.email })
    if (user) {
        return res.status(200).json({ msg: 'user is Alredy existed' })
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    await Schema.create(req.body).then((data) => {
        return res.status(200).json({ msg: 'User add Successfully !', user: data })
    })
}

module.exports.login = async (req, res) => {
    const user = await Schema.findOne({ email: req.body.email })
    if (!user) {
        return res.status(200).json({ msg: 'Admin not found !!', code: 203 })
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ user }, 'mernsatckProject', { expiresIn: '1h' })
        return res.status(200).json({ msg: 'User logged successfully !!', code: 200, token })
    }
    else {
        return res.status(200).json({ msg: 'user password is wrong !', code: 204 });
    }
}

module.exports.allUser = async (req, res) => {
    await Schema.find({}).then((data) => {
        return res.status(200).json({ msg: 'All User Data Find !!', data })

    })
}