import axios from 'axios';
import { BASE_URL } from 'constants/appConstants';
import { createGenericReduxErrorHandler } from '../utils/request';

const ACTION_BASE = 'PET/';

export const FETCH_ALL_PETS_START = ACTION_BASE + 'FETCH_ALL_PETS_START';
export const FETCH_ALL_PETS_SUCCESS = ACTION_BASE + 'FETCH_ALL_PETS_SUCCESS ';
export const FETCH_ALL_PETS_FAIL = ACTION_BASE + 'FETCH_ALL_PETS_FAIL';

export const FETCH_PET_START = ACTION_BASE + 'FETCH_PET_START';
export const FETCH_PET_SUCCESS = ACTION_BASE + 'FETCH_PET_SUCCESS';
export const FETCH_PET_FAIL = ACTION_BASE + 'FETCH_PET_FAIL';

const PET_URL = BASE_URL + '/pet';

export function fetchPet(petId) {
    return dispatch => {
        dispatch({ type: FETCH_PET_START });

        return axios.get(`${PET_URL}/${petId}`)
            .then(response => dispatch({ type: FETCH_PET_SUCCESS, pet: response.data.pet }))
            .catch(createGenericReduxErrorHandler(dispatch, FETCH_PET_FAIL));
    };
}

export function fetchAllPets(userId) {
    return dispatch => {
        dispatch({ type: FETCH_ALL_PETS_START });

        return axios
            .get(`${PET_URL}/get-all-by-user/${userId}`)
            .then(response => dispatch({ type: FETCH_ALL_PETS_SUCCESS, pets: response.data.pets }))
            .catch(createGenericReduxErrorHandler(dispatch, FETCH_ALL_PETS_FAIL));
    };
}
