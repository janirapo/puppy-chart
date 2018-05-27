import axios from 'axios';
import { JWT_KEY } from 'constants/appConstants';
import { notify } from '../actions/notifyActions';
import { NOTIFICATION_TYPE_DANGER } from '../constants/appConstants';
import { t } from './i18n';

/**
 * @returns {void}
 */
export function setupAuthorizedRequests() {
    const jwt = localStorage.getItem(JWT_KEY);

    if (!jwt) {
        removeToken();
        return;
    }

    // Intercept every request's response/error before it is given to response-handler
    axios.interceptors.response.use(
        response => {
            const token = response.data.token;

            // In case of successful request, refresh token
            if (token) {
                localStorage.setItem(JWT_KEY, token);

                setDefaultRequestAuthorizationToken(token);
            }

            return response;
        },
        error => {
            // In case of 401, remove old token and redirect to login
            if (error && error.response && error.response.status === 401) {
                removeToken();
                return;
            }

            return Promise.reject(error);
        },
    );

    setDefaultRequestAuthorizationToken(jwt);
}

/**
 * @param {Function} dispatch
 * @param {string} type
 * @returns {Function}
 */
export function createGenericReduxErrorHandler(dispatch, type) {
    return error => {
        if (error.constructor === TypeError) {
            // React cannot handle stuff that breaks it, but console.log still works!
            console.log(error);
            return;
        }

        const errorMsg =
            (error.response &&
                error.response.data &&
                error.response.data.errors &&
                error.response.data.errors.message &&
                t(error.response.data.errors.message)) ||
            error.message;

        dispatch(notify(errorMsg, NOTIFICATION_TYPE_DANGER));

        dispatch({
            type: type,
            error: errorMsg,
        });
    };
}

/**
 * @param {string} token
 * @returns {void}
 */
function setDefaultRequestAuthorizationToken(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

/**
 * Remove jwt token from localstorage
 * @returns {void}
 */
export function removeToken() {
    localStorage.removeItem(JWT_KEY);
}
