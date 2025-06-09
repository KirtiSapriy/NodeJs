const express = require('express')
const route = express.Router()
const ctl = require('../controller/managerCtl')
const auth = require('../middleware/auth')
const otpCheck = require('../middleware/checkOtp')

route.post('/login', ctl.login)
route.get('/viewProfile', auth, ctl.profile)
route.put('/changePassword', auth, ctl.changePassword)
route.post('/forgotPass', ctl.ForgotPass)
route.put('/recoverAccount', otpCheck, ctl.recoverAccount)
route.post('/employeeAdd', auth, ctl.employeeAdd)
route.get('/showEmployee', auth, ctl.showEmployee)


module.exports = route