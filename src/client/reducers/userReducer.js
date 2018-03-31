import initialState from './initialState';
import { FETCH_USER, RECEIVE_USER } from '../actions/actionTypes';

export default function user(state = initialState.user, action) {
    switch (action.type) {
        case FETCH_USER:
            console.log('FETCH_USER Action', action);
            return state;
        case RECEIVE_USER:
            console.log('RECEIVE_USER Action', action);
            return {
                ...state,
                name: action.user.name,
            };
        default:
            return state;
    }
}
