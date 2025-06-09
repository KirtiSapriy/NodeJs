const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/MERNSTACKApis')
const db = mongoose.connection

db.once('open', (er) => {
    er ? console.log(er) : console.log('DB Connected');
})

module.exports = db