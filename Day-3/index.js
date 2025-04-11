const express = require('express')
const port = 2000;
const path = require('path')
const app = express()


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static(path.join(__dirname, 'public')));

const middle = (req, res, next) => {
    req.body.name = "kirti"
    console.log(req.body);
    next()
}

let data = [{ id: 1, name: "kirti", subject: "node" }]

app.post("/getData", middle, (req, res) => {
    req.body.id = data.length + 1
    data.push(req.body)
    res.redirect('/')
})

app.get('/deleteData', (req, res) => {
    let newData = data.filter((el) => el.id != req.query.id)
    data = newData
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render("index", { data })
})

app.get('/Edit/:id', (req, res) => {

    let singl = data.find((el) => el.id == req.params.id)

    res.render('edit', { singl })
})
app.post("/UpdataData", (req, res) => {
    data.forEach((el) => {
        if (el.id == req.body.id) {
            el.name = req.body.name,
                el.subject = req.body.subject
        } else {
            el
        }
        res.redirect("/")
    })

})
app.listen(port, (er) => {
    er ? console.log(er) : console.log('Server Start');
})