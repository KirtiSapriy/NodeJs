const express = require('express')
const port = 2000;
const app = express()
const path = require('path')
const fs = require('fs')
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
        await schema.create(req.body)
        res.redirect('/')
    } catch (er) {
        console.log(er);
    }
})

app.get('/deleteData', async (req, res) => {

    let singlData = await schema.findById(req.query.id);
    fs.unlinkSync(singlData.image)
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

app.post('/updateData', multer, async (req, res) => {
    let singleData = await schema.findById(req.body.id)
   
    let img = ""
    req.file ? img = req.file.path : img = singleData.image
   
    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img
   
    await schema.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/')
    
})

app.listen(port, (er) => {
    er ? console.log(er) : console.log('server start ' + port);

})