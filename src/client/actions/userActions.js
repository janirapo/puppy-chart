import axios from 'axios';
import { BASE_URL, JWT_KEY } from 'constants/appConstants';
import { createGenericReduxErrorHandler, setupAuthorizedRequests, removeToken } from '../utils/request';

const USER_URL = BASE_URL + '/user';

const ACTION_BASE = 'PET/';

export const FETCH_USER_START = ACTION_BASE + 'FETCH_USER_START';
export const FETCH_USER_SUCCESS = ACTION_BASE + 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = ACTION_BASE + 'FETCH_USER_FAIL';

export const LOGIN_START = ACTION_BASE + 'LOGIN_START';
export const LOGIN_FAIL = ACTION_BASE + 'LOGIN_FAIL';
export const LOGIN_SUCCESS = ACTION_BASE + 'LOGIN_SUCCESS';

export const LOG_OUT = 'LOG_OUT';

export function fetchUser(userId) {
    return dispatch => {
        dispatch({ type: FETCH_USER_START });

        return axios
            .get(`${USER_URL}/${userId}`)
            .then(response => dispatch({ type: FETCH_USER_SUCCESS, user: response.data.user }))
            .catch(createGenericReduxErrorHandler(dispatch, FETCH_USER_FAIL));
    };
}

export function performLogin(values) {
    return dispatch => {
        dispatch({ type: LOGIN_START });

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
                dispatch({ type: LOGIN_SUCCESS, user: response.data.user });
            })
            .catch(createGenericReduxErrorHandler(dispatch, LOGIN_FAIL));
    };
}

export function logout() {
    removeToken();
    return { type: LOG_OUT };
}
