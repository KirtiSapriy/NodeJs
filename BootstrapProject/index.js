const express = require('express')
const port = 2000
const path = require('path')
const app = express()


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/categories', (req, res) => {
    res.render('categories')
})


app.get('/anime-details', (req, res) => {
    res.render('anime-details')
})
app.get('/anime-watching', (req, res) => {
    res.render('anime-watching')
})
app.get('/blog-details', (req, res) => {
    res.render('blog-details')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/blog', (req, res) => {
    res.render('blog')
})
app.listen(port, (er) => {
    er ? console.log(er) : console.log(`Srever Start ${port}`);
    ;

})