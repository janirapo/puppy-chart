import axios from 'axios';
import { BASE_URL } from '../constants/appConstants';
import * as types from './actionTypes';

const USER_URL = BASE_URL + '/user';

export function receiveUser(json) {
    return { type: types.RECEIVE_USER, user: json.user };
}

export function fetchUser(userId) {
    return dispatch => {
        return axios.get(`${USER_URL}/${userId}`)
            .then(response => dispatch(receiveUser(response.data)));
    };
}
