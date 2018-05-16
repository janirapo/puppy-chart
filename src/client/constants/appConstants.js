export const BASE_URL = '/api';

export const NOTIFICATION_TYPE_NOTIFY = 'notify';
export const NOTIFICATION_TYPE_DANGER = 'danger';

export const NOTIFICATION_TYPES = [NOTIFICATION_TYPE_NOTIFY, NOTIFICATION_TYPE_DANGER];

export const JWT_KEY = 'puppy-chart-jwt';

/**
 * NO OP function that does nothing, but returns null
 * @returns {null}
 */
export const noop = () => null;

export const DEFAULT_MODAL_STYLE = {
    overlay: {
        backgroundColor: 'rgba(19,19,19,0.8)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minHeight: '300px',
        minWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto',
    },
};

export const METRIC_KEY_WEIGHT = 'weight';
export const METRIC_KEY_HEIGHT = 'height';

export const METRIC_TYPES = [METRIC_KEY_WEIGHT, METRIC_KEY_HEIGHT];
