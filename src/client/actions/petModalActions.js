import { createGenericReduxErrorHandler } from '../utils/request';
import { notify } from './notifyActions';
import { t } from '../utils/i18n';
import { BASE_URL } from 'constants/appConstants';

const ACTION_BASE = 'PET_MODAL/';

export const OPEN_PET_MODAL = ACTION_BASE + 'OPEN_PET_MODAL';
export const CLOSE_PET_MODAL = ACTION_BASE + 'CLOSE_PET_MODAL';

export const ADD_MEASUREMENT_START = ACTION_BASE + 'ADD_MEASUREMENT_START';
export const ADD_MEASUREMENT_SUCCESS = ACTION_BASE + 'ADD_MEASUREMENT_SUCCESS';
export const ADD_MEASUREMENT_FAIL = ACTION_BASE + 'ADD_MEASUREMENT_FAIL';

/**
 * Opens modal and initializes pet received as argument
 * @param pet
 * @returns {{type: string, pet: *}}
 */
export function openPetModal(pet) {
    return { type: OPEN_PET_MODAL, pet: pet };
}

/**
 * Closes modal and resets reducer state
 * @returns {{type: string}}
 */
export function closePetModal() {
    return { type: CLOSE_PET_MODAL };
}

/**
 * Add new measurement to db
 * @param petId
 * @param value
 * @param metric
 * @returns {Function}
 */
export function addMeasurement(petId, value, metric) {
    return dispatch => {
        dispatch({ type: ADD_MEASUREMENT_START });

        const measurementData = {
            petId: petId,
            value: value,
            metric: metric,
        };

        axios
            .post(`${BASE_URL}/measurement`, measurementData)
            .then(response => {
                dispatch({ type: ADD_MEASUREMENT_SUCCESS, pet: response.pet });
                dispatch(notify(t('measurement_added')));
            })
            .catch(createGenericReduxErrorHandler(dispatch, ADD_MEASUREMENT_FAIL));
    };
}
