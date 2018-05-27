import moment from 'moment';

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
        backgroundColor: '#fff4e6',
        color: '#140b00',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minHeight: '300px',
        minWidth: '650px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: '90vh', // <-- This sets the height
        overlfow: 'scroll', // <-- This tells the modal to scroll
    },
};

export const METRIC_KEY_WEIGHT = 'weight';
export const METRIC_KEY_HEIGHT = 'height';

export const METRIC_TYPES = [METRIC_KEY_WEIGHT, METRIC_KEY_HEIGHT];

export const DEFAULT_METRIC_UNITS = { [METRIC_KEY_WEIGHT]: 'kg', [METRIC_KEY_HEIGHT]: 'cm' };

export const DEFAULT_CHART_CONFIG = {
    chart: {
        type: 'line',
        backgroundColor: 'rgba(255, 251, 246, 0.85)',
    },
    title: {
        text: '',
    },
    subtitle: {
        text: '',
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            month: '%b',
        },
        labels: {
            format: '{value:%e. %b}',
            align: 'center',
        },
        title: {
            text: '',
            style: {
                display: 'none',
            },
        },
    },
    yAxis: {
        title: {
            text: '',
        },
        style: {
            display: 'none',
        },
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true,
            },
            enableMouseTracking: false,
        },
    },
    series: [],
    tooltip: {
        backgroundColor: {
            linearGradient: [0, 0, 0, 60],
            stops: [[0, '#FFFFFF'], [1, '#E0E0E0']],
        },
        borderWidth: 1,
        borderColor: '#AAA',
        formatter: function() {
            return `<div style="text-align: right">${moment(this.x).format('ll')}<br />${this.y}</div>`;
        },
        useHTML: true,
    },
    credits: false,
};
