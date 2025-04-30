const express = require('express')
const port = 1000;
const path = require('path')
const app = express()
const db = require('./confing/db')


app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/', require('./routes/route'))


app.listen(port, (er) => {
    er ? console.log(er) : console.log('server Start Port :' + port);
})
