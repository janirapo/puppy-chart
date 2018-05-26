import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from 'components/User/index';
import moment from 'moment';
import * as notifyActions from 'actions/notifyActions';
import { logout } from 'actions/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notification from './common/Notification';
import PetModal from './Pet/PetModal/index';
import { NOTIFICATION_TYPES } from 'constants/appConstants';
import ConfirmationDialog from './common/ConfirmationDialog';
import Modal from 'react-modal';
import i18n, { t } from 'utils/i18n';
import ReactHighcharts from "react-highcharts";

import './App.scss';

import { setupAuthorizedRequests } from 'utils/request';

// set locale to current language
moment.locale(i18n.language);

ReactHighcharts.Highcharts.setOptions({
    lang: {
        shortMonths: moment.monthsShort(),
        months: moment.months(),
        weekdays: moment.weekdays(),
    },
});

// bind Modal to root element
Modal.setAppElement('#root');

function mapStateToProps(state) {
    return {
        ...state.notify,
        userId: state.user.id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notifyActions: bindActionCreators(notifyActions, dispatch),
        handleLogout: () => dispatch(logout()),
    };
}

class App extends Component {
    componentWillMount() {
        setupAuthorizedRequests();
    }

    render() {
        const {
            notificationText,
            notificationType,
            showConfirmationDialog,
            confirmationContent,
            handleLogout,
            userId,
        } = this.props;

        return (
            <div className="App content">
                <div className="header-container">
                    <h2>Puppy Chart</h2>
                    {userId && (
                        <div className="logout-container">
                            <button type="button" onClick={handleLogout}>
                                {t('log_out')}
                            </button>
                        </div>
                    )}
                </div>
                <User />
                <PetModal />
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
    handleLogout: PropTypes.func.isRequired,
    userId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
