const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1/bookStore')

const db = mongoose.connection

db.once('open', (er) => {
    er ? console.log(er) : console.log('mongoDB connected....');
})

module.exports = db