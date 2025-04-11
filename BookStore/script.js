
// veriabl defind
const express = require('express')
const port = 1006
const app = express()
const db = require('./config/db')
const schema = require('./model/schema')

// some app process
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// index pege render or get data for mongodb
app.get('/', async (req, res) => {
    await schema.find({}).then((data) => {

        res.render('index', { data })
    })
})

// Add Book form pege render

app.get('/addBook', (req, res) => {
    res.render('addBooks')
})

// post data in  for mongodb and redirect index

app.post('/addBooks', async (req, res) => {
    await schema.create(req.body).then(() => {
        res.redirect('/')
    }).catch((er) => console.log(er))
})

//  data delete in mongodb and redirect index
app.get('/deleteData', async (req, res) => {
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect('/')
    }).catch((er) => console.log(er))
})

// find singl data and render update form 
app.get('/editData', async (req, res) => {
    await schema.findById(req.query.id).then((data) => {
        res.render('update', { data })
    }).catch(er => console.log(er))
})
// data update and redirect index page
app.post('/updateData', async (req, res) => {



    await schema.findByIdAndUpdate(req.body.id, req.body).then((data) => {
        console.log(data);
        res.redirect('/')

    })
})

app.listen(port, (er) => {
    er ? console.log(er) : console.log('server start port : ' + port);
})