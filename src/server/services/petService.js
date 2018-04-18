const models = require('../models');

/**
 * Get all pets belnging to given user
 *
 * @param userId
 * @param cb
 * @param next
 */
exports.getAllByUser = function(userId, cb, next) {
    models.Pet.findAll({ where: { user_id: userId } })
        .then(cb)
        .catch(next);
};

/**
 * Add new pet to database with the values defined in
 * given petData object
 *
 * @param petData
 * @param cb
 * @param next
 */
exports.addPet = function(petData, cb, next) {
    const newPet = models.Pet.build(petData);

    newPet
        .save()
        .then(cb)
        .catch(next);
};
