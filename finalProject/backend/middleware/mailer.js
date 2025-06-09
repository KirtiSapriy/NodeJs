const mailer = require('nodemailer')

const Transport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sapriyak01@gmail.com',
        pass: 'jsnpnlicbyfwunxh'
    }
})

module.exports.SendMail = (to, subject, text) => {
    let mainOpations = {
        to: to,
        from: 'sapriyak01@gmail.com',
        subject: subject,
        text: text
    }
    Transport.sendMail(mainOpations)
}