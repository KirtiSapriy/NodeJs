const express = require('express')

const route = express.Router()
const ctl = require('../controller/ctl')
const passport = require('../middleware/passport')

route.get("/", ctl.login)
route.post('/login', passport.authenticate('local', { failureRedirect: '/' }), ctl.userAdmin)

route.get('/logout', ctl.logout)

route.get("/dashboard", passport.checkAuth, ctl.dashboard)

route.get('/addAdmin', passport.checkAuth, ctl.addAdmin)
route.get('/viewAdmin', passport.checkAuth, ctl.viewAdmin)

route.get('/editAdminData', passport.checkAuth, ctl.editAdminData)

route.get('/deleteAdminData', passport.checkAuth, ctl.DeleteAdminData)

route.post('/addAdmin', passport.checkAuth, ctl.addAdminData)

route.post('/updateAdmin', passport.checkAuth, ctl.updateAdmin)

route.get('/myProfile', passport.checkAuth, ctl.myProfile)

route.get('/changepass', passport.checkAuth, ctl.changepass)
route.post('/changePass', passport.checkAuth, ctl.changePass)

route.post('/recoverUser', ctl.recoverUser)
route.post('/VerifyOtp', ctl.VerifyOtp)





module.exports = route