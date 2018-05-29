import { createGenericReduxErrorHandler } from '../utils/request';
import { notify, openConfirmationDialog } from './notifyActions';
import { t } from '../utils/i18n';
import { BASE_URL } from 'constants/appConstants';
import moment from 'moment';
import axios from 'axios';

const ACTION_BASE = 'PET_MODAL/';

export const OPEN_PET_MODAL = ACTION_BASE + 'OPEN_PET_MODAL';
export const CLOSE_PET_MODAL = ACTION_BASE + 'CLOSE_PET_MODAL';

export const ADD_MEASUREMENT_START = ACTION_BASE + 'ADD_MEASUREMENT_START';
export const ADD_MEASUREMENT_SUCCESS = ACTION_BASE + 'ADD_MEASUREMENT_SUCCESS';
export const ADD_MEASUREMENT_FAIL = ACTION_BASE + 'ADD_MEASUREMENT_FAIL';

export const REMOVE_MEASUREMENT_START = ACTION_BASE + 'REMOVE_MEASUREMENT_START';
export const REMOVE_MEASUREMENT_SUCCESS = ACTION_BASE + 'REMOVE_MEASUREMENT_SUCCESS';
export const REMOVE_MEASUREMENT_FAIL = ACTION_BASE + 'REMOVE_MEASUREMENT_FAIL';

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
 * @param values
 * @param metricType
 * @returns {Function}
 */
export function addMeasurement(petId, values, metricType) {
    return dispatch => {
        dispatch({ type: ADD_MEASUREMENT_START });

        const measurementData = {
            measurementDt: moment(values.measurementDate).format('YYYY-MM-DD'),
            petId: petId,
            value: values.value,
            metricName: metricType,
        };

        axios
            .post(`${BASE_URL}/measurement`, measurementData)
            .then(response => {
                dispatch({ type: ADD_MEASUREMENT_SUCCESS, pet: response.data });
                dispatch(notify(t('measurement_added')));
            })
            .catch(createGenericReduxErrorHandler(dispatch, ADD_MEASUREMENT_FAIL));
    };
}

/**
 * Remove measurement
 *
 * @param measurementId
 * @returns {Function}
 */
export function removeMeasurement(measurementId) {
    return dispatch => {
        dispatch({ type: REMOVE_MEASUREMENT_START });

        dispatch(
            openConfirmationDialog({
                title: `${t('remove_measurement')}?`,
                text: t('remove_measurement_confirmation'),
                hideReject: false,
                acceptText: t('remove'),
                rejectText: t('cancel'),
                onAccept: () => {
                    axios
                        .delete(`${BASE_URL}/measurement/${measurementId}`)
                        .then(response => {
                            console.log(response.data);
                            dispatch({ type: REMOVE_MEASUREMENT_SUCCESS, measurementId: measurementId });
                            dispatch(notify(t('measurement_removed')));
                        })
                        .catch(createGenericReduxErrorHandler(dispatch, REMOVE_MEASUREMENT_FAIL));
                },
            }),
        );
    };
}
