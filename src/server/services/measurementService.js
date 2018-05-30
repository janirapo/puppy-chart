import { Measurement } from '../models';
import { getPet } from './petService';
import { camelToUnderscore } from "../constants";



/**
 * Add new measurement to database with the values defined in
 * given measurementData object
 *
 * @param measurementData
 * @param cb
 * @param next
 */
export const addMeasurement = (measurementData, cb, next) => {
    // TODO: Validate values?

    // object keys might be in camelCase, so create new object with underscored keys
    const fixedKeyData = Object.keys(measurementData).reduce((acc, key) => {
        acc[camelToUnderscore(key)] = measurementData[key];
        return acc;
    }, {});

    const newMeasurement = Measurement.build(fixedKeyData);

    newMeasurement
        .save()
        .then(dbResult => getPet(dbResult.pet_id, dbResult.user_id, cb, next))
        .catch(next);
};

/**
 * Data should contain userId and measurementId
 * @param data
 * @param cb
 * @param next
 */
export const deleteMeasurement = (data, cb, next) => {
    const { measurementId, userId } = data;

    Measurement.destroy({ where: { id: measurementId, user_id: userId } })
        .then(cb)
        .catch(next);
};
