const express = require('express')
const router = express.Router()
const ctl = require('../controllers/registrCtl')
const auth = require('../midellware/auth')

router.post('/userRegiter', ctl.addUser)
router.post('/login', ctl.login)
router.get('/allUser', auth, ctl.allUser)

module.exports = router

