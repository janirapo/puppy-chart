import initialState from './initialState';
import {
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    LOGIN_START,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
} from 'actions/userActions';
import {
    FETCH_ALL_PETS_FAIL,
    FETCH_ALL_PETS_START,
    FETCH_ALL_PETS_SUCCESS,
    ADD_PET_START,
    ADD_PET_SUCCESS,
    ADD_PET_FAIL,
} from "../actions/petActions";

export default function user(state = initialState.user, action) {
    switch (action.type) {
        case LOGIN_START:
        case FETCH_USER_START:
            return {
                ...initialState.user,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...initialState.user,
                id: action.user.id,
                name: action.user.name,
                loading: false,
            };
        case ADD_PET_START:
        case FETCH_ALL_PETS_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                id: action.user.id,
                name: action.user.name,
                loading: false,
            };
        case FETCH_ALL_PETS_SUCCESS:
            return {
                ...state,
                pets: action.pets,
                loading: false,
            };
        case ADD_PET_FAIL:
        case FETCH_ALL_PETS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case FETCH_USER_FAIL:
        case LOGIN_FAIL:
            return {
                ...initialState.user,
                error: action.error,
                loading: false,
            };
        case ADD_PET_SUCCESS:
            return {
                ...state,
                pets: state.pets.concat(action.newPet),
            };
        default:
            return state;
    }
}
