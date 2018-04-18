const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('./services/userService');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(email, password, done) {
    userService.findUserByEmail(email, function(user) {
        if(!user || !user.validPassword(user, password)){
            return done(null, false, {errors: {'email or password': 'is invalid'}});
        }

        return done(null, user);
    }, done);
}));
