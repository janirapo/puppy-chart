import axios from 'axios';
import { BASE_URL, JWT_KEY } from 'constants/appConstants';
import { createGenericReduxErrorHandler, setupAuthorizedRequests, removeToken } from '../utils/request';
import { openConfirmationDialog } from './notifyActions';
import { t } from '../utils/i18n';
import { SubmissionError } from 'redux-form';

const USER_URL = BASE_URL + '/user';

const ACTION_BASE = 'PET/';

export const FETCH_USER_START = ACTION_BASE + 'FETCH_USER_START';
export const FETCH_USER_SUCCESS = ACTION_BASE + 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = ACTION_BASE + 'FETCH_USER_FAIL';

export const LOGIN_START = ACTION_BASE + 'LOGIN_START';
export const LOGIN_FAIL = ACTION_BASE + 'LOGIN_FAIL';
export const LOGIN_SUCCESS = ACTION_BASE + 'LOGIN_SUCCESS';

export const REGISTER_NEW_USER_START = ACTION_BASE + 'REGISTER_NEW_USER_START';
export const REGISTER_NEW_USER_FAIL = ACTION_BASE + 'REGISTER_NEW_USER_FAIL';
export const REGISTER_NEW_USER_SUCCESS = ACTION_BASE + 'REGISTER_NEW_USER_SUCCESS';

export const SHOW_REGISTER_FORM = ACTION_BASE + 'SHOW_REGISTER_FORM';
export const HIDE_REGISTER_FORM = ACTION_BASE + 'HIDE_REGISTER_FORM';

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

/**
 * Login user
 *
 * @param values
 * @returns {function(*=): Promise<AxiosResponse<any>>}
 */
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

/**
 * Logout user
 * @returns {Function}
 */
export function logout() {
    return dispatch => {
        dispatch(
            openConfirmationDialog({
                title: t('log_out'),
                text: t('log_out_confirmation'),
                hideReject: false,
                acceptText: t('log_out'),
                rejectText: t('cancel'),
                onAccept: () => {
                    removeToken();
                    return dispatch({ type: LOG_OUT });
                },
            }),
        );
    };
}

export function registerNewUser(values) {
    return dispatch => {
        dispatch({ type: REGISTER_NEW_USER_START });

        if (values.password !== values.confirmPassword) {
            throw new SubmissionError({
                _error: t('register_error'),
                confirmPassword: t('passwords_dont_match_error'),
            });
        }

        const newUserObj = {
            name: values.name,
            email: values.email,
            password: values.password,
        };

        return axios
            .post(USER_URL, newUserObj)
            .then(() => {
                dispatch({ type: REGISTER_NEW_USER_SUCCESS });
            })
            .catch(createGenericReduxErrorHandler(dispatch, REGISTER_NEW_USER_FAIL));
    };
}

export function showRegisterForm() {
    return { type: SHOW_REGISTER_FORM };
}

export function hideRegisterForm() {
    return { type: HIDE_REGISTER_FORM };
}
