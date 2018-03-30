import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    };
}

class User extends Component {
    componentWillMount() {
        // HERE WE ARE TRIGGERING THE ACTION
        this.props.userActions.fetchUser();
    }
    render() {
        const { user: { userName } } = this.props;

        return <div className="content-container">{`Welcome ${userName ? userName : 'Unknown user'}`}</div>;
    }
}

User.propTypes = {
    user: PropTypes.shape({ userName: PropTypes.string }),
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
