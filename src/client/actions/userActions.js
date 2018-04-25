import axios from 'axios';
import { BASE_URL, JWT_KEY } from 'constants/appConstants';
import * as types from 'actions/actionTypes';
import { createGenericReduxErrorHandler, setupAuthorizedRequests, removeToken } from '../utils/request';

const USER_URL = BASE_URL + '/user';

export function receiveUser(json) {
    return { type: types.RECEIVE_USER, user: json.user };
}

export function fetchUser(userId) {
    return dispatch => {
        return axios
            .get(`${USER_URL}/${userId}`)
            .then(response => dispatch(receiveUser(response.data)))
            .catch(createGenericReduxErrorHandler(dispatch, types.FETCH_USER_FAIL));
    };
}

export function performLogin(values) {
    return dispatch => {
        const loginObj = {
            user: {
                email: values.email,
                password: values.password,
            },
        };
        return axios
            .post(`${USER_URL}/login`, loginObj)
            .then(response => {
                localStorage.setItem(JWT_KEY, response.data.user.token);
                setupAuthorizedRequests();
                dispatch({ type: types.LOGIN_SUCCESS, user: response.data.user });
            })
            .catch(createGenericReduxErrorHandler(dispatch, types.LOGIN_FAIL));
    };
}

export function logout() {
    removeToken();
    return {type: types.LOG_OUT};
}
