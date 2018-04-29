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

router.post('/', auth.required, function(req, res, next) {

    const petData = Object.assign(req.body, {user_id: req.payload.id});

    // TODO: Validate that all values are set!!

    petService.addPet(
        petData,
        dbResult => {
            res.send(JSON.stringify(dbResult));
        },
        next,
    );
});

module.exports = router;
