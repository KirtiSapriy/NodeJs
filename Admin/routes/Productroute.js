const express = require('express')
const route = express.Router()
const ctl = require('../controller/productsCtl')
const passport = require('../middleware/passport')
const multer = require('../middleware/multer')

route.get('/addPro', passport.checkAuth, ctl.addPro)
route.post('/addProducts', passport.checkAuth, multer, ctl.addProduct)
route.get('/viewProducts', passport.checkAuth, ctl.viewProduct)



module.exports = route