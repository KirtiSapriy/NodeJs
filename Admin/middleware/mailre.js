const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail'
    ,
    auth: {
        user: "sapriyak01@gmail.com",
        pass: 'wtgulmhzhyyarueq'
    }
})

module.exports.sendOTP = (to, otp) => {
    let mainOpations = {
        to: to,
        form: 'sapriyak01@gmail.com',
        subject: 'PASSWORD RESET OTP',
        text: `your password reset otp is ${otp}`
    }
    transport.sendMail(mainOpations)
}