const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer')
const ctl = require('../controller/productCtl')
const password = require('../middleware/passport')

router.get('/addPro', password.isAuth, ctl.addpro)
router.post('/addProducts', password.isAuth, multer, ctl.addProducts)
router.get('/viewProducts', password.isAuth, ctl.viewProducts)

module.exports = router