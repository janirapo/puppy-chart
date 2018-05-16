import { NOTIFICATION_TYPE_NOTIFY, noop } from 'constants/appConstants';

export default {
    user: {
        id: undefined,
        name: undefined,
        pets: [],
        error: undefined,
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
    petModal: {
        isOpen: false,
        pet: {
            user: {},
        },
        loading: false,
        error: undefined,
    },
};
