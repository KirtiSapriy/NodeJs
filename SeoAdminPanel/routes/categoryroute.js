const express = require('express')
const router = express.Router()
const ctl = require('../controller/categoryctl')
const password = require('../middleware/passport')
const multer = require('../middleware/multer')

router.get('/addCat', password.isAuth, ctl.addCat)
router.post('/addCategory', password.isAuth, multer, ctl.addCategory)
router.get('/viewCat', password.isAuth, ctl.viewCat)

module.exports = router