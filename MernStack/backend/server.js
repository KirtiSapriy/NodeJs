const express = require('express')
const path = require('path')
const port = 5000

const app = express()
const db = require('./confing/db')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', require('./routers/route'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.listen(port, (er) => {
    er ? console.log(er) : console.log('server satrt port' + port);
})