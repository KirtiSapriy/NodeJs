const express = require('express')
const route = express.Router()
const ctl = require('../controller/ctl')

route.post('/newUser', ctl.userCreate)
route.post('/login', ctl.login)

module.exports = route