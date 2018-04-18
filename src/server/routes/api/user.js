const router = require('express').Router();
const passport = require('passport');
const auth = require('../auth');
const userService = require('../../services/userService');

router.get('/all', auth.optional, function(req, res, next) {
    userService.getAllUsers(dbResult => {
        res.send(JSON.stringify({ users: dbResult }));
    }, next);
});

router.post('/login', function(req, res, next) {
    if (!req.body.user.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.user.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }

    passport.authenticate('local', { session: false }, function(err, user, info) {
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

router.get('/:userId(\\d+)/', auth.required, function(req, res, next) {
    userService.getUser(
        req.params.userId,
        dbResult => {
            res.send(JSON.stringify({ user: dbResult }));
        },
        next,
    );
});

module.exports = router;
