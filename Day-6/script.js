const express = require('express');
const port = 200;
const db = require('./config/db')
const schema = require('./modals/schema')
const multer = require('./middleware/multer')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {

    await schema.find({}).then((students) => {
        res.render('index', { students })
    })

})

app.post("/addData", multer, async (req, res) => {

    console.log(req.file);

    await schema.create(req.body).then(() => {
        res.redirect("/")
    })

})

app.get('/Delete', async (req, res) => {
    await schema.findByIdAndDelete(req.query.id).then(() => {

        res.redirect("/")
    })
})

app.get('/Edit', async (req, res) => {
    await schema.findById(req.query.id).then((Data) => {
        res.render("update", { Data })
    })
})

app.post('/updateData', async (req, res) => {

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/")
    })

})

app.listen(port, (er) => {
    er ? console.log(er) : console.log('Server started');
})