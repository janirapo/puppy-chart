export const BASE_URL = '/api';

export const NOTIFICATION_TYPE_NOTIFY = 'notify';
export const NOTIFICATION_TYPE_DANGER = 'danger';

export const NOTIFICATION_TYPES = [NOTIFICATION_TYPE_NOTIFY, NOTIFICATION_TYPE_DANGER];

/**
 * NO OP function that does nothing, but returns null
 * @returns {null}
 */
export const noop = () => null;

export const DEFAULT_MODAL_STYLE = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minHeight: '300px',
        minWidth: '250px',
    },
};
