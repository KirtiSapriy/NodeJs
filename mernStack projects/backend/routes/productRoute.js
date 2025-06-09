const express = require('express')
const router = express.Router()
const ctl = require('../controllers/productCtl')

router.post('/addProduct', ctl.addProduct)
router.get('/getProduct', ctl.getProduct)

module.exports = router
