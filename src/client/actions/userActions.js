import * as types from './actionTypes';

function url() {
    return 'www.url.com';
}

export function receiveUser(json) {
    return { type: types.RECEIVE_USER, user: json.user };
}

export function fetchUser() {
    return dispatch => {
        return fetch(url(), {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'x-api-key': apiKey,
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => dispatch(receiveUser(json)));
    };
}
