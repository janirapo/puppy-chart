import initialState from './initialState';
import { FETCH_ALL_PETS, RECEIVE_ALL_PETS } from '../actions/actionTypes';

export default function pets(state = initialState.pets, action) {
    switch (action.type) {
        case FETCH_ALL_PETS:
            console.log('FETCH_ALL_PETS Action', action);
            return state;
        case RECEIVE_ALL_PETS:
            console.log('RECEIVE_ALL_PETS Action', action);
            return action.pets;
        default:
            return state;
    }
}
