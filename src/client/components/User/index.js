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
    render() {
        const { userName } = this.props;

        return <div className="content-container">{`Welcome ${userName ? userName : 'Unknown user'}`}</div>;
    }
}

User.propTypes = {
    userName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
