import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PetList from '../Pet/PetList';

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
        this.props.userActions.fetchUser(1); // TODO: Replace static userID
    }
    render() {
        const { user: { id, name } } = this.props;

        return <div className="content-container">{`Welcome ${name ? name : 'Unknown user'}`}<div>{id && <PetList/>}</div></div>;
    }
}

User.propTypes = {
    user: PropTypes.shape({ userName: PropTypes.string }),
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
