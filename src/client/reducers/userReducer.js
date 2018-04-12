import initialState from './initialState';
import { FETCH_ALL_PETS, FETCH_USER, RECEIVE_ALL_PETS, RECEIVE_USER } from "actions/actionTypes";

export default function user(state = initialState.user, action) {
    switch (action.type) {
        case FETCH_USER:
        case FETCH_ALL_PETS:
            return {
                ...state,
            };
        case RECEIVE_USER:
            return {
                ...state,
                id: action.user.id,
                name: action.user.name,
            };
        case RECEIVE_ALL_PETS:
            return {
                ...state,
                pets: action.pets,
            };
        default:
            return state;
    }
}
