import { Pet, User, Metric, Measurement } from '../models';

/**
 * Get all pets belnging to given user
 *
 * @param userId
 * @param cb
 * @param next
 */
export const getAllByUser = (userId, cb, next) => {
    Pet.findAll({
        where: {
            user_id: userId,
        },
        include: [
            { model: Measurement, as: 'measurements', include: [{ model: Metric, as: 'metric' }] },
            { model: User, as: 'user' },
        ],
    })
        .then(cb)
        .catch(next);
};

/**
 *
 * @param petId
 * @param userId
 * @param cb
 * @param next
 */
export const getPet = (petId, userId, cb, next) => {
    Pet.findOne({ where: { id: petId, user_id: userId } })
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
export const addPet = (petData, cb, next) => {
    // TODO: Validate values?

    const newPet = Pet.build(petData);

    newPet
        .save()
        .then(cb)
        .catch(next);
};
