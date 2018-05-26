import initialState from './initialState';
import {
    CLOSE_PET_MODAL,
    OPEN_PET_MODAL,
    ADD_MEASUREMENT_START,
    ADD_MEASUREMENT_SUCCESS,
    ADD_MEASUREMENT_FAIL,
    REMOVE_MEASUREMENT_START,
    REMOVE_MEASUREMENT_SUCCESS,
    REMOVE_MEASUREMENT_FAIL,
} from '../actions/petModalActions';

export default function petModal(state = initialState.petModal, action) {
    switch (action.type) {
        case OPEN_PET_MODAL:
            return {
                ...state,
                pet: action.pet,
                isOpen: true,
            };

        case CLOSE_PET_MODAL:
            return initialState.petModal;

        case REMOVE_MEASUREMENT_START:
        case ADD_MEASUREMENT_START:
            return {
                ...state,
            };

        case ADD_MEASUREMENT_SUCCESS:
            return {
                ...state,
                pet: action.pet,
            };

        case REMOVE_MEASUREMENT_SUCCESS:
            return {
                ...state,
                pet: {
                    ...state.pet,
                    measurements: (state.pet.measurements || []).filter(
                        measurement => measurement.id !== action.measurementId,
                    ),
                },
            };

        case ADD_MEASUREMENT_FAIL:
        case REMOVE_MEASUREMENT_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
}
