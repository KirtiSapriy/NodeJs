const express = require('express')
const port = 2000

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

let TaskData = []

app.get('/', (req, res) => {
    res.render('index', { TaskData })
})

app.post('/addTask', (req, res) => {
    req.body.id = TaskData.length == 0 ? TaskData.length + 1 : Number(TaskData[TaskData.length - 1].id) + 1
    req.body.status = false

    TaskData.push(req.body)

    res.redirect("/")
})
app.get('/edit/:id', (req, res) => {
    let singlTask = TaskData.find((el) => el.id == req.params.id)

    res.render('updateTask', { singlTask })

})
app.get('/deleteTask', (req, res) => {
    let newTasks = TaskData.filter((el) => el.id != req.query.id)
    TaskData = newTasks
    res.redirect("/")
})
app.get("/isStatus/:id", (req, res) => {
    let status = TaskData.find((el) => el.id == req.params.id)
    status.status = true
    TaskData.forEach((el, i) => {
        if (el.id == status.id) {
            TaskData[i] = status
        }
    })

    res.redirect('/')



})
app.post("/UpdateTask", (req, res) => {
    TaskData.forEach((el, i) => {
        if (el.id == req.body.id) {
            req.body.status = TaskData[i].status;
            TaskData[i] = req.body;
        }
    })
    res.redirect('/')

})
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server start port no. ${port}`);
    ;

})