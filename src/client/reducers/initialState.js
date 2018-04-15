import { NOTIFICATION_TYPE_NOTIFY, noop } from 'constants/appConstants';

export default {
    user: {
        id: undefined,
        userName: undefined,
        pets: [],
    },
    notify: {
        showConfirmationDialog: false,
        confirmationContent: {
            title: '',
            text: '',
            hideReject: false,
            acceptText: 'Hyväksy',
            rejectText: 'Peruuta',
            onAccept: noop,
            onReject: noop,
        },
        notificationText: undefined,
        notificationType: NOTIFICATION_TYPE_NOTIFY,
    },
};
