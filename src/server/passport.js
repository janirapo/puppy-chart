import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmail, validPassword } from './services/userService';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'user[email]',
            passwordField: 'user[password]',
        },
        (email, password, done) => {
            findUserByEmail(
                email,
                user => {
                    if (!user || !validPassword(user.dataValues, password)) {
                        return done(null, false, {
                            errors: {
                                message: 'invalid_email_or_password',
                                error: {},
                            },
                        });
                    }

                    return done(null, user);
                },
                done,
            );
        },
    ),
);
