const express = require('express')
const port = 1006

const app = express()
const path = require('path')
const db = require("./confing/db")
const cookie = require("cookie-parser")
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const Flash = require('./middleware/flash')


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: true }))
app.use(cookie())
app.use(session({
    name: 'local',
    secret: 'seoadmin',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 }
}))
app.use(passport.session())
app.use(passport.initialize())

app.use(flash())
app.use(Flash.setFlash)

app.use('/', require('./routes/route'))
app.use('/category', require('./routes/categoryroute'))
app.use('/SubCategory', require('./routes/subCatRoute'))
app.use('/products', require('./routes/productsRoute'))


app.listen(port, (er) => {
    er ? console.log(er) : console.log('server Start port : ' + port);
})