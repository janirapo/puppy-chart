const router = require('express').Router();
const auth = require('../auth');
const userService = require('../../services/userService');

router.get('/all', auth.optional, function(req, res, next) {
    userService.getAllUsers(dbResult => {
        res.send(JSON.stringify({ users: dbResult }));
    }, next);
});

router.get('/:userId', auth.optional, function(req, res, next) {
    userService.getUser(
        req.params.userId,
        dbResult => {
            res.send(JSON.stringify({ user: dbResult }));
        },
        next,
    );
});

module.exports = router;
