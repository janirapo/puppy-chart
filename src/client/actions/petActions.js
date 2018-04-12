import axios from 'axios';
import { BASE_URL } from 'constants/appConstants';
import * as types from 'actions/actionTypes';

const PET_URL = BASE_URL + '/pet';

export function receivePet(json) {
    return { type: types.RECEIVE_PET, pet: json.pet };
}

export function fetchPet(petId) {
    return dispatch => {
        return axios.get(`${PET_URL}/${petId}`)
            .then(response => dispatch(receivePet(response.data)));
    };
}

export function receiveAllPets(json) {
    return { type: types.RECEIVE_ALL_PETS, pets: json.pets };
}

export function fetchAllPets(userId) {
    return dispatch => {
        return axios.get(`${PET_URL}/get-all-by-user/${userId}`)
            .then(response => dispatch(receiveAllPets(response.data)));
    };
}
