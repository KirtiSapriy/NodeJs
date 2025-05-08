const passport = require('passport')
const localSt = require('passport-local').Strategy;
const Schema = require('../modals/schema')

passport.use('local', new localSt(
    { usernameField: 'email' },
    async (email, password, done) => {
        let admin = await Schema.findOne({ email: email });
        if (admin) {
            if (admin.password == password) {
                return done(null, admin)
            } else {
                return done(null, false)
            }
        } else {
            return done(null, false)
        }
    }
))

passport.serializeUser(async (admin, done) => {
    return done(null, admin.id)
})

passport.deserializeUser(async (adminId, done) => {
    let admin = await Schema.findById(adminId);
    if (admin) {
        return done(null, admin)
    }
    else {
        return done(null, false)
    }
})

passport.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user
        next()
    }
    else {
        res.redirect('/')
    }
}
module.exports = passport