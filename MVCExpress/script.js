const express = require('express')
const port = 1000
const app = express()
const db = require('./config/db')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use("/", require('./routes/route'))
app.use('/addData', require('./routes/route'))
app.use('/deleteData', require('./routes/route'))
app.use('/editData', require('./routes/route'))
app.use('/updateData', require('./routes/route'))

app.listen(port, (er) => {
    er ? console.log(er) : console.log('server start port :' + port)
})