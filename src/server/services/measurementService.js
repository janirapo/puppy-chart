import { Measurement } from '../models';
import { getPet } from './petService';
import { camelToUnderscore } from '../constants';

/**
 * Add new measurement to database with the values defined in
 * given measurementData object
 *
 * @param measurementData
 */
export const addMeasurement = measurementData => {
    // object keys might be in camelCase, so create new object with underscored keys
    const fixedKeyData = Object.keys(measurementData).reduce(
        (acc, key) => ({
            ...acc,
            [camelToUnderscore(key)]: measurementData[key],
        }),
        {},
    );

    const newMeasurement = Measurement.build(fixedKeyData);

    return newMeasurement.save().then(dbResult => getPet(dbResult.pet_id, dbResult.user_id));
};

/**
 * Data should contain userId and measurementId
 *
 * @param data
 */
export const deleteMeasurement = data => {
    const { measurementId, userId } = data;

    return Measurement.destroy({ where: { id: measurementId, user_id: userId } });
};
