import express from 'express';
import passport from 'passport';
import auth from '../auth';
import * as userService from '../../services/userService';
import * as petService from '../../services/petService';

let router = express.Router();

// get all users
router.get('/all', auth.required, (req, res, next) => {
    userService.getAllUsers(dbResult => {
        res.send(JSON.stringify({ users: dbResult }));
    }, next);
});

// handle login
router.post('/login', (req, res, next) => {
    if (!req.body.user.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.user.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }

    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (user) {
            user.token = userService.generateJWT(user);
            return res.json({ user: userService.toAuthJSON(user) });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

// register new user
router.post('/', auth.optional, (req, res, next) => {
    userService.addUser(
        req.body,
        dbResult => {
            res.send(JSON.stringify({ user: dbResult }));
        },
        next,
    );
});

// get user
router.get('/:userId(\\d+)/', auth.required, (req, res, next) => {
    userService.getUser(
        req.params.userId,
        dbResult => {
            res.send(JSON.stringify({ user: dbResult }));
        },
        next,
    );
});

export default router;
