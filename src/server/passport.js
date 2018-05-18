import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userService from './services/userService';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'user[email]',
            passwordField: 'user[password]',
        },
        (email, password, done) => {
            userService.findUserByEmail(
                email,
                user => {
                    if (!user || !userService.validPassword(user.dataValues, password)) {
                        return done(null, false, { errors: 'invalid email or password' });
                    }

                    return done(null, user);
                },
                done,
            );
        },
    ),
);
