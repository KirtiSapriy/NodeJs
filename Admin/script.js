const express = require('express');
const path = require('node:path');
const db = require('./config/db')
const port = 1000;

const app = express()
const cookie = require('cookie-parser')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookie())

app.use('/', require('./routes/route'))


app.listen(port, (er) => {
    er ? console.log(er) : console.log('server start ' + port);

})