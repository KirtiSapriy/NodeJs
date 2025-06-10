const express = require('express')
const route = express.Router()
const ctl = require('../controller/productCtl')
const auth = require('../middelware/auth')

route.post('/addData', auth, ctl.addData)
route.get('/getData', auth, ctl.getData)
route.delete('/deleteData', auth, ctl.deleteData)
route.put('/updateData', auth, ctl.UpadateData)

module.exports = route