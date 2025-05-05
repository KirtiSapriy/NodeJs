const express = require('express')

const route = express.Router()
const ctl = require('../controller/ctl')
const passport = require('../middleware/passport')

route.get("/", ctl.login)
route.post('/login', passport.authenticate('local', { failureRedirect: '/' }), ctl.userAdmin)
route.get('/logout', ctl.logout)
route.get("/dashboard", ctl.dashboard)
route.get('/addAdmin', ctl.addAdmin)
route.get('/viewAdmin', ctl.viewAdmin)
route.get('/editAdminData', ctl.editAdminData)
route.get('/deleteAdminData', ctl.DeleteAdminData)
route.post('/addAdmin', ctl.addAdminData)
route.post('/updateAdmin', ctl.updateAdmin)





module.exports = route