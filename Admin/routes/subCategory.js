const express = require('express')
const route = express.Router()
const ctl = require('../controller/subCategory')
const passport = require('../middleware/passport')

route.get('/addSubCat', passport.checkAuth, ctl.addSubCategory)
route.post('/addSubCategory', passport.checkAuth, ctl.addSubCat)
route.get('/viewSubCat', passport.checkAuth, ctl.viewSubCat)


module.exports = route