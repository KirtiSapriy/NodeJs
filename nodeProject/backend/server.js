const express = require('express');

const port = 1000;

const app = express()
const db = require('./config/db')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/', require('./route/route'))
app.use('/products', require('./route/productRoute'))

app.listen(port, (er) => {
    er ? console.log(er) : console.log(`server start port : ${port}`);
})