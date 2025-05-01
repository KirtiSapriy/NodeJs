const express = require('express')
const port = 1006

const app = express()
const path = require('path')
const db = require("./confing/db")
const cookie = require("cookie-parser")

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookie())

app.use('/', require('./routes/route'))


app.listen(port, (er) => {
    er ? console.log(er) : console.log('server Start port : ' + port);
})