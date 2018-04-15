import { NOTIFICATION_TYPE_NOTIFY, NOTIFICATION_TYPES } from "constants/appConstants";
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION, CLOSE_CONFIRMATION_DIALOG } from "./actionTypes";

export function openConfirmationDialog(confirmationContent) {
    return dispatch => {

        // TODO
    }
}

export function closeConfirmationDialog() {
    return {
        type: CLOSE_CONFIRMATION_DIALOG,
    }
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
    }
}

export function hideNotification() {
    return {
        type: HIDE_NOTIFICATION,
    }
}
