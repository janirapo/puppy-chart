import { ALERT_TYPE_NOTIFY } from "constants/appConstants";

export default {
    user: {
        id: undefined,
        userName: undefined,
        pets: [],
    },
    notify: {
        showConfirmationDialog: false,
        confirmationContent: {},
        alertText: undefined,
        alertType: ALERT_TYPE_NOTIFY,
    }
};
