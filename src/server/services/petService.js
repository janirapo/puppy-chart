import { Pet, User, Metric, Measurement } from '../models';

const includedModels = [
    { model: Measurement, as: 'measurements', include: [{ model: Metric, as: 'metric' }] },
    { model: User, as: 'user' },
];

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
            active_flag: true,
        },
        include: includedModels,
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
    Pet.findOne({ where: { id: petId, user_id: userId }, include: includedModels })
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

/**
 * Deactivate pet with given ID
 *
 * @param petData
 * @param cb
 * @param next
 */
export const deactivatePet = (petData, cb, next) => {
    getPet(
        petData.petId,
        petData.userId,
        dbResult => {
            Pet.update({ active_flag: false }, { where: { id: dbResult.id } })
                .then(cb)
                .catch(next);
        },
        next,
    );
};
