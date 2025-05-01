const express = require('express')

const router = express.Router()
const ctl = require("../controller/ctl")

router.get('/', ctl.login)
router.post('/login', ctl.userLogin)
router.get('/logout', ctl.userLogout)
router.get('/dashboard', ctl.dashboard)
router.get('/addAdmin', ctl.addAdmin)
router.get('/viewAdmin', ctl.viewAdmin)
router.post('/AddAdminData', ctl.AddAdminData)
router.get('/deleteAdminData', ctl.deleteAdminData)
router.get('/editAdminData', ctl.editAdminData)
router.post('/updateAdminData', ctl.updateAdminData)

module.exports = router