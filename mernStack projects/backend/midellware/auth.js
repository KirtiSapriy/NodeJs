const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    let token = req.header('Authorization')

    if (!token) {
        return res.status(400).json({ msg: 'Token Not Found' });
    }

    let decode = jwt.verify(token, 'mernsatckProject')
    req.user = decode

    next()
}

module.exports = auth