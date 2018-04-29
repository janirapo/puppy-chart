import { NOTIFICATION_TYPE_NOTIFY, NOTIFICATION_TYPES } from 'constants/appConstants';

const ACTION_BASE = 'NOTIFY/';

export const OPEN_CONFIRMATION_DIALOG = ACTION_BASE + 'OPEN_CONFIRMATION_DIALOG';
export const CLOSE_CONFIRMATION_DIALOG = ACTION_BASE + 'CLOSE_CONFIRMATION_DIALOG';

export const SHOW_NOTIFICATION = ACTION_BASE + 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = ACTION_BASE + 'HIDE_NOTIFICATION';

export function openConfirmationDialog(confirmationContent) {
    return {
        type: OPEN_CONFIRMATION_DIALOG,
        ...confirmationContent,
        handleClose: () => dispatch(closeConfirmationDialog()),
    };
}

export function closeConfirmationDialog() {
    return {
        type: CLOSE_CONFIRMATION_DIALOG,
    };
}

export function notify(notificationText = '', notificationType = NOTIFICATION_TYPE_NOTIFY, duration = 3000) {
    return dispatch => {
        if (NOTIFICATION_TYPES.indexOf(notificationType) > -1) {
        }

        dispatch({
            type: SHOW_NOTIFICATION,
            notificationText: notificationText,
            notificationType: notificationType,
        });

        // call hide after given duration
        setTimeout(() => {
            dispatch(hideNotification());
        }, duration);
    };
}

export function hideNotification() {
    return {
        type: HIDE_NOTIFICATION,
    };
}
