import axios from 'axios';
import { BASE_URL } from 'constants/appConstants';
import { createGenericReduxErrorHandler } from '../utils/request';
import moment from 'moment';
import { notify, openConfirmationDialog } from './notifyActions';
import { t } from '../utils/i18n';

const ACTION_BASE = 'PET/';

export const FETCH_ALL_PETS_START = ACTION_BASE + 'FETCH_ALL_PETS_START';
export const FETCH_ALL_PETS_SUCCESS = ACTION_BASE + 'FETCH_ALL_PETS_SUCCESS ';
export const FETCH_ALL_PETS_FAIL = ACTION_BASE + 'FETCH_ALL_PETS_FAIL';

export const FETCH_PET_START = ACTION_BASE + 'FETCH_PET_START';
export const FETCH_PET_SUCCESS = ACTION_BASE + 'FETCH_PET_SUCCESS';
export const FETCH_PET_FAIL = ACTION_BASE + 'FETCH_PET_FAIL';

export const ADD_PET_START = ACTION_BASE + 'ADD_PET_START';
export const ADD_PET_SUCCESS = ACTION_BASE + 'ADD_PET_SUCCESS';
export const ADD_PET_FAIL = ACTION_BASE + 'ADD_PET_FAIL';

export const REMOVE_PET_START = ACTION_BASE + 'REMOVE_PET_START';
export const REMOVE_PET_SUCCESS = ACTION_BASE + 'REMOVE_PET_SUCCESS';
export const REMOVE_PET_FAIL = ACTION_BASE + 'REMOVE_PET_FAIL';

const PET_URL = BASE_URL + '/pet';

/**
 *
 * @param petId
 * @returns {function(*=): Promise<AxiosResponse<any>>}
 */
export function fetchPet(petId) {
    return dispatch => {
        dispatch({ type: FETCH_PET_START });

        return axios
            .get(`${PET_URL}/${petId}`)
            .then(response => dispatch({ type: FETCH_PET_SUCCESS, pet: response.data.pet }))
            .catch(createGenericReduxErrorHandler(dispatch, FETCH_PET_FAIL));
    };
}

/**
 *
 * @param userId
 * @returns {function(*=): Promise<AxiosResponse<any>>}
 */
export function fetchAllPets(userId) {
    return dispatch => {
        dispatch({ type: FETCH_ALL_PETS_START });

        return axios
            .get(`${PET_URL}/get-all-by-user/${userId}`)
            .then(response => dispatch({ type: FETCH_ALL_PETS_SUCCESS, pets: response.data.pets }))
            .catch(createGenericReduxErrorHandler(dispatch, FETCH_ALL_PETS_FAIL));
    };
}

/**
 *
 * @param values
 * @param onSuccess
 * @returns {function(*=): Promise<AxiosResponse<any>>}
 */
export function addPet(values, onSuccess) {
    return dispatch => {
        dispatch({ type: ADD_PET_START });

        const petObj = {
            ...values,
            birth_date: moment(values.dateOfBirth).format('YYYY-MM-DD'),
        };

        return axios
            .post(`${PET_URL}`, petObj)
            .then(response => {
                dispatch({ type: ADD_PET_SUCCESS, newPet: response.data });
                dispatch(notify(t('pet_added')));
                onSuccess && onSuccess();
            })
            .catch(createGenericReduxErrorHandler(dispatch, ADD_PET_FAIL));
    };
}

/**
 *
 * @param petId
 * @returns {function(*=): Promise<AxiosResponse<any>>}
 */
export function removePet(petId) {
    return dispatch => {
        dispatch({ type: REMOVE_PET_START });

        dispatch(
            openConfirmationDialog({
                title: `${t('remove_pet')}?`,
                text: t('remove_pet_confirmation'),
                hideReject: false,
                acceptText: t('remove'),
                rejectText: t('cancel'),
                onAccept: () => {
                    axios
                        .delete(`${PET_URL}/${petId}`)
                        .then(() => {
                            dispatch({ type: REMOVE_PET_SUCCESS, petId: petId });
                            dispatch(notify(t('pet_removed')));
                        })
                        .catch(createGenericReduxErrorHandler(dispatch, REMOVE_PET_FAIL));
                },
            }),
        );
    };
}
