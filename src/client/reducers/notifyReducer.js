import initialState from './initialState';
import {
    OPEN_CONFIRMATION_DIALOG,
    CLOSE_CONFIRMATION_DIALOG,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
} from 'actions/notifyActions';

export default function notify(state = initialState.notify, action) {
    switch (action.type) {
        case OPEN_CONFIRMATION_DIALOG:
            return {
                ...state,
                confirmationContent: {
                    ...initialState.notify.confirmationContent,
                    ...action,
                },
                showConfirmationDialog: true,
            };
        case CLOSE_CONFIRMATION_DIALOG:
            return {
                ...state,
                showConfirmationDialog: initialState.notify.showConfirmationDialog,
                confirmationContent: initialState.notify.confirmationContent,
            };
        case SHOW_NOTIFICATION:
            return {
                ...state,
                notificationText: action.notificationText,
                notificationType: action.notificationType,
            };
        case HIDE_NOTIFICATION:
            return {
                ...state,
                notificationText: initialState.notify.notificationText,
                notificationType: initialState.notify.notificationType,
            };

        default:
            return state;
    }
}
