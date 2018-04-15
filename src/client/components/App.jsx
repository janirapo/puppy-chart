import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from 'components/User/index';
import moment from 'moment';
import { PageHeader } from 'react-bootstrap';
import * as notifyActions from 'actions/notifyActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notification from './common/Notification';
import { NOTIFICATION_TYPES } from 'constants/appConstants';
import ConfirmationDialog from './common/ConfirmationDialog';
import Modal from 'react-modal';

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
    render() {
        const { notificationText, notificationType, showConfirmationDialog, confirmationContent } = this.props;

        return (
            <div className="content">
                <PageHeader>Puppy Chart</PageHeader>
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
