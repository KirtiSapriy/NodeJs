const mailer = require('nodemailer')

let trasport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sapriyak01@gmail.com',
        pass: 'bvbv pghk ujbc hhhf'
    }
})

module.exports.sendOTP = (to, Otp) => {
    let mainOpations = {
        to: to,
        form: 'sapriyak01@gmail.com',
        subject: 'PASSWORD RESET OTP',
        text: `${Otp} Your password reset request most be accept`
    }
    trasport.sendMail(mainOpations)
}