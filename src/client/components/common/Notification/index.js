import React from 'react';
import PropTypes from 'prop-types';
import { NOTIFICATION_TYPES, NOTIFICATION_TYPE_DANGER } from 'constants/appConstants';
import cx from 'classnames';

import './Notification.scss';

const Notification = props => {
    const { notificationText, notificationType } = props;

    const styleClass = cx('Notification', {
        'Notification--danger': notificationType === NOTIFICATION_TYPE_DANGER,
        show: notificationText && notificationText.length > 0,
    });

    return <div className={styleClass}>{notificationText}</div>;
};

Notification.propTypes = {
    notificationText: PropTypes.string,
    notificationType: PropTypes.oneOf(NOTIFICATION_TYPES),
};

export default Notification;
