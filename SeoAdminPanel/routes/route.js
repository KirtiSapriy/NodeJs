const express = require('express')

const router = express.Router()
const ctl = require("../controller/ctl")
const passport = require('../middleware/passport')

router.get('/', ctl.login)
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), ctl.userLogin)
router.get('/logout', ctl.userLogout)
router.get('/dashboard', passport.isAuth, ctl.dashboard)
router.get('/addAdmin', passport.isAuth, ctl.addAdmin)
router.get('/viewAdmin', passport.isAuth, ctl.viewAdmin)
router.post('/AddAdminData', passport.isAuth, ctl.AddAdminData)
router.get('/deleteAdminData', passport.isAuth, ctl.deleteAdminData)
router.get('/editAdminData', passport.isAuth, ctl.editAdminData)
router.post('/updateAdminData', passport.isAuth, ctl.updateAdminData)
router.get('/profile', passport.isAuth, ctl.profile)
router.get('/changePassword', passport.isAuth, ctl.changePassword)
router.post('/changePass', passport.isAuth, ctl.changePass)
router.get('/forgotPass', ctl.forgotPass)
router.post('/getOTP', ctl.getOTP)
router.post('/setPass', ctl.setPass)

module.exports = router