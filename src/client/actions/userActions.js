import * as types from './actionTypes';
import { fetchUser as fetchUserCall} from "../services/userService";

export function receiveUser(json) {
    return { type: types.RECEIVE_USER, user: json.user };
}

export function fetchUser() {
    return dispatch => {
        return fetchUserCall()
            .then(response => dispatch(receiveUser(response.data)));
    };
}
