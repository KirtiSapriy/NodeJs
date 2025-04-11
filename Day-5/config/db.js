const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/Node')

const db = mongoose.connection

db.once('open', () => {
    console.log('Db is connected')
})


module.exports = db