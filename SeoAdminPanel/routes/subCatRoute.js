const express = require('express')
const router = express.Router()
const ctl = require('../controller/subCatCtl')
const password = require('../middleware/passport')

router.get('/addSubCat', password.isAuth, ctl.addSubCat)
router.post('/addSubCategory', password.isAuth, ctl.addSubCategory)
router.get('/viewSubCat', password.isAuth, ctl.viewSubCat)

module.exports = router