const express = require('express')
const route = express.Router()
const ctl = require('../controllers/ctl')
const multer = require('../middlewares/multer');


route.post('/addData', multer.single('image'), ctl.addData)
route.get('/getData', ctl.getData)
route.delete('/deleteData', ctl.deleteData)
route.put('/updateData', multer.single('image'), ctl.UpadateData)
route.get('/singleData/:id', ctl.getSingleData)

module.exports = route