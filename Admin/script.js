const express = require('express');
const path = require('node:path');
const db = require('./config/db')
const port = 1000;

const app = express()
const cookie = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const connectFlash = require('connect-flash')
const flash = require('./middleware/flash')
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use(cookie())

app.use(session({
    name: 'local',
    secret: 'metrix',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 }
}))
app.use(passport.session())
app.use(passport.initialize())

app.use(connectFlash())
app.use(flash.setFlash)

app.use('/', require('./routes/route'))

app.listen(port, (er) => {
    er ? console.log(er) : console.log('Server Start Port No. ' + port);

})