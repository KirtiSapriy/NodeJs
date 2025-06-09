const jwt = require('jsonwebtoken');
const schema = require('../modal/schema')
const auth = async (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(404).json({ msg: 'token not Found' })
    }

    let decode = jwt.verify(token, 'mernStack');
    let user = await schema.findOne({ email: decode.user.email })
    if (!user) {
        return res.status(404).json({ msg: "user Not Found !" })
    }
    req.user = decode;
    next()
}
module.exports = auth