import initialState from './initialState';
import { FETCH_USER, RECEIVE_USER } from '../actions/actionTypes';

export default function user(state = initialState.user, action) {
    let newState;
    switch (action.type) {
        case FETCH_USER:
            console.log('FETCH_USER Action');
            return action;
        case RECEIVE_USER:
            newState = action.user;
            console.log('RECEIVE_USER Action');
            return newState;
        default:
            return state;
    }
}
