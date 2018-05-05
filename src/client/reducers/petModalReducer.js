import initialState from './initialState';
import { CLOSE_PET_MODAL, OPEN_PET_MODAL } from "../actions/petModalActions";

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

        default:
            return state;
    }
}
