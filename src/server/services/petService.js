const Pet = require('../model/Pet');

/**
 * Get all pets belnging to given user
 *
 * @param userId
 * @param cb
 */
exports.getAllByUser = function(userId, cb, next) {
    Pet.findAll({ where: { user_id: userId } })
        .then(cb)
        .catch(next);
};

/**
 * Add new pet to database with the values defined in
 * given petData object
 *
 * @param petData
 * @param cb
 */
exports.addPet = function(petData, cb, next) {
    const newPet = Pet.build(petData);

    newPet
        .save()
        .then(cb)
        .catch(next);
};
