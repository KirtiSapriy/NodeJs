const express = require('express')
const port = 5000;

const app = express()
const db = require('./confing/db')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/', require('./routes/route'))

app.listen(port, (er) => {
    er ? console.log(er) : console.log(`Server Started port : ${port}`);
})