const express = require('express')
const port = 2000;
const app = express()
const path = require('path')
const db = require('./config/db')
const schema = require('./modals/schema');
const multer = require('./middleware/multer')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', async (req, res) => {
    try {
        await schema.find({}).then((data) => {
            res.render('index', { data })

        })
    } catch (er) {
        console.log(er);

    }
})

app.post('/addData', multer, async (req, res) => {

    try {
        req.body.image = req.file.path

        await schema.create(req.body).find
        res.redirect('/')
    } catch (er) {
        console.log(er);

    }



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