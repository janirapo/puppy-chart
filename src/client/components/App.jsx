import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from 'components/User/index';
import moment from 'moment';
import * as notifyActions from 'actions/notifyActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notification from './common/Notification';
import { NOTIFICATION_TYPES } from 'constants/appConstants';
import ConfirmationDialog from './common/ConfirmationDialog';
import Modal from 'react-modal';

import { setupAuthorizedRequests } from 'utils/request';

// set locale to finnish
moment.locale('fi');

// bind Modal to root element
Modal.setAppElement('#root');

function mapStateToProps(state) {
    return {
        ...state.notify,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notifyActions: bindActionCreators(notifyActions, dispatch),
    };
}

class App extends Component {
    componentWillMount() {
        setupAuthorizedRequests();
    }

    render() {
        const { notificationText, notificationType, showConfirmationDialog, confirmationContent } = this.props;

        return (
            <div className="content">
                <h2>Puppy Chart</h2>
                <User />
                <Notification notificationText={notificationText} notificationType={notificationType} />
                {showConfirmationDialog && <ConfirmationDialog {...confirmationContent} />}
            </div>
        );
    }
}

App.propTypes = {
    notificationText: PropTypes.string,
    notificationType: PropTypes.oneOf(NOTIFICATION_TYPES),
    showConfirmationDialog: PropTypes.bool.isRequired,
    confirmationContent: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
