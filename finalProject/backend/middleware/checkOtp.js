const jwt = require('jsonwebtoken')

const OtpCheck = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(404).json({ msg: 'token Not reserv' });
    }
    let decode = jwt.verify(token, 'otpCheck')

    if (decode.exp > (Date.now() / 1000)) {
        req.otpData = decode
        // next()
        if (req.body.otp == decode.otp) {
            next()
        } else {
            res.status(200).json({ msg: 'otp is Wrong !! Enter Creact Otp' })
        }
    } else {
        return res.status(200).json({ msg: 'this Otp Is not Valid !! get New Otp' })
    }

}

module.exports = OtpCheck