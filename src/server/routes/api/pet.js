const router = require('express').Router();
const auth = require('../auth');
const petService = require('../../services/petService');

router.get('/get-all-by-user/:userId', auth.optional, function(req, res, next) {
    petService.getAllByUser(
        req.params.userId,
        dbResult => {
            res.send(JSON.stringify({ pets: dbResult }));
        },
        next,
    );
});

router.post('/', auth.optional, function(req, res, next) {
    console.log(req.body, req.params);

    petService.addPet(
        req.body,
        dbResult => {
            res.send(JSON.stringify({ pets: dbResult }));
        },
        next,
    );
});

module.exports = router;
