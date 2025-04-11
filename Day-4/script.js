const express = require('express')
const port = 2000;
const app = express()
const db = require('./config/db')
const schema = require('./modals/schema');
const { cache } = require('ejs');


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    try {
        await schema.find({}).then((data) => {
            res.render('index', { data })

        })
    } catch (er) {
        console.log(er);

    }
})

app.post('/addData', async (req, res) => {


    try {
        await schema.create(req.body)
        res.redirect('/')

    } catch (er) { console.log(er) }

})

app.get('/deleteData', async (req, res) => {
    try {
        await schema.findByIdAndDelete(req.query.id)
        res.redirect('/')
    }
    catch (er) {
        console.log(er);

    }
})
app.get('/editData', async (req, res) => {
    try {
        await schema.findById(req.query.id).then((data) => {
            res.render('update', { data })
        })
    } catch (er) {
        console.log(er);

    }
})

app.post('/updateData', async (req, res) => {
    try {
        
        await schema.findByIdAndUpdate(req.body.id, req.body)
        res.redirect('/')
    }
    catch (er) {
        console.log(er);

    }
})

app.listen(port, (er) => {
    er ? console.log(er) : console.log('server start ' + port);

})