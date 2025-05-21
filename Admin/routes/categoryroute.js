const express = require('express')
const route = express.Router()
const ctl = require('../controller/categoryctl')
const passport = require('../middleware/passport')
const multer = require('../middleware/multer')

route.get('/addCat', passport.checkAuth, ctl.addCategory)
route.post('/addCategory', passport.checkAuth, multer, ctl.addCat)
route.get('/viewCat', passport.checkAuth, ctl.viewCat)



module.exports = route