const ACTION_BASE = 'PET_MODAL/';

export const OPEN_PET_MODAL = ACTION_BASE + 'OPEN_PET_MODAL';
export const CLOSE_PET_MODAL = ACTION_BASE + 'CLOSE_PET_MODAL';

export function openPetModal(pet) {
    return { type: OPEN_PET_MODAL, pet: pet };
}

export function closePetModal(pet) {
    return { type: CLOSE_PET_MODAL };
}
