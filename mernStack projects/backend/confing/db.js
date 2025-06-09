const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1/MERNstackProject')

// const db = mongoose.connection

// db.once('open', (er) => {
//     er ? console.log(er) : console.log('DB Connected');
// })

mongoose.connect('mongodb+srv://sapriyak01:kirti1006@cluster0.aoji9pp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('db connected');
})

// module.exports = db

module.exports = mongoose

