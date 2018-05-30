import initialState from './initialState';
import {
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    LOGIN_START,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_NEW_USER_FAIL,
    REGISTER_NEW_USER_SUCCESS,
    REGISTER_NEW_USER_START,
    SHOW_REGISTER_FORM,
    HIDE_REGISTER_FORM,
} from 'actions/userActions';
import {
    FETCH_ALL_PETS_FAIL,
    FETCH_ALL_PETS_START,
    FETCH_ALL_PETS_SUCCESS,
    ADD_PET_START,
    ADD_PET_SUCCESS,
    ADD_PET_FAIL,
    REMOVE_PET_START,
    REMOVE_PET_SUCCESS,
    REMOVE_PET_FAIL,
} from '../actions/petActions';

export default function user(state = initialState.user, action) {
    switch (action.type) {
        case LOGIN_START:
        case FETCH_USER_START:
            return {
                ...initialState.user,
                loading: true,
                error: undefined,
            };
        case LOGIN_SUCCESS:
            return {
                ...initialState.user,
                id: action.user.id,
                name: action.user.name,
                loading: false,
                error: undefined,
            };
        case REGISTER_NEW_USER_START:
        case ADD_PET_START:
        case REMOVE_PET_START:
        case FETCH_ALL_PETS_START:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                id: action.user.id,
                name: action.user.name,
                loading: false,
                error: undefined,
            };
        case FETCH_ALL_PETS_SUCCESS:
            return {
                ...state,
                pets: action.pets,
                loading: false,
                error: undefined,
            };
        case REMOVE_PET_SUCCESS:
            return {
                ...state,
                pets: (state.pets || []).filter(pet => pet.id !== action.petId),
                error: undefined,
            };
        case REMOVE_PET_FAIL:
        case ADD_PET_FAIL:
        case FETCH_ALL_PETS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case REGISTER_NEW_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                registerFormVisible: false,
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
                error: undefined,
            };
        case SHOW_REGISTER_FORM:
            return {
                ...state,
                registerFormVisible: true,
                error: undefined,
            };
        case REGISTER_NEW_USER_SUCCESS:
        case HIDE_REGISTER_FORM:
            return {
                ...state,
                registerFormVisible: false,
                error: undefined,
            };
        default:
            return state;
    }
}
