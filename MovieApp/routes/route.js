const express = require('express')
const multer = require('../middelware/multer')

const route = express.Router()
const ctl = require('../controller/ctl')
route.get('/', ctl.pageLoad)
route.get('/movieData', ctl.addMoviePage)
route.post('/addMovieData', multer, ctl.addMovieData)
route.get('/deleteData', ctl.deleteMovieData)
route.get('/editData', ctl.editMovieData)
route.post('/updateMovieData', multer, ctl.updateMovieData)



module.exports = route