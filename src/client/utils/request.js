import axios from 'axios';
import { JWT_KEY } from 'constants/appConstants';

/**
 * @returns {void}
 */
export function setupAuthorizedRequests() {
    const jwt = localStorage.getItem(JWT_KEY);

    if (!jwt) {
        removeTokenAndRedirectToLogin();
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
                removeTokenAndRedirectToLogin();
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

        dispatch({
            type: type,
            error:
                (error.response.data && error.response.data.errors && JSON.stringify(error.response.data.errors)) ||
                error.message,
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
 * If user has no jwt, redirect to login
 * @returns {void}
 */
function removeTokenAndRedirectToLogin() {
    localStorage.removeItem(JWT_KEY);

    // TODO: something
}
