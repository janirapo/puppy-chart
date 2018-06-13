import { Pet, User, Metric, Measurement } from '../models';

const includedModels = [
    { model: Measurement, as: 'measurements', include: [{ model: Metric, as: 'metric' }] },
    { model: User, as: 'user' },
];

/**
 * Get all pets belnging to given user
 *
 * @param userId
 */
export const getAllByUser = userId => {
    return Pet.findAll({
        where: {
            user_id: userId,
            active_flag: true,
        },
        include: includedModels,
    });
};

/**
 *
 * @param petId
 * @param userId
 */
export const getPet = (petId, userId) => {
    return Pet.findOne({ where: { id: petId, user_id: userId }, include: includedModels });
};

/**
 * Add new pet to database with the values defined in
 * given petData object
 *
 * @param petData
 */
export const addPet = petData => {
    // TODO: Validate values?

    const newPet = Pet.build(petData);

    return newPet.save();
};

/**
 * Deactivate pet with given ID
 *
 * @param petData
 */
export const deactivatePet = petData => {
    return getPet(petData.petId, petData.userId).then(dbResult => {
        Pet.update({ active_flag: false }, { where: { id: dbResult.id } });
    });
};
