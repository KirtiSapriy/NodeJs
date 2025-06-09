const express = require('express')
const port = 1000
const path = require('path')

const app = express()
const db = require('./confing/db')

app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/admin', require('./routes/route'))
app.use('/manager', require('./routes/managerRoute'))
app.use('/employee', require('./routes/employeeRoute'))

app.listen(port, (er) => {
    er ? console.log(er) : console.log(`server start port : ${port}`);
})