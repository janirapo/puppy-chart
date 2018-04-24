import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'actions/userActions';
import * as petActions from 'actions/petActions';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

import PetList from 'components/Pet/PetList';
import LoginForm from "components/common/LoginForm";
import { JWT_KEY } from 'constants/appConstants';

import './User.scss';


function mapStateToProps(state) {
    return state.user;
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        petActions: bindActionCreators(petActions, dispatch),
    };
}

class User extends Component {
    componentWillMount() {
        // check if jwt is found in local storage and activate auto-login in that case
        const jwtToken = localStorage.getItem(JWT_KEY);
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken, { complete: true });
            const dateNow = new Date();

            if (decodedToken.exp < dateNow.getTime()) {
                return true;
            }

            const { userActions } = this.props;
            // HERE WE ARE TRIGGERING THE ACTION
            userActions.fetchUser(decodedToken.id);
        }
    }
    render() {
        const { id, name, pets, userActions, petActions, error } = this.props;

        if (!id) {
            return <LoginForm onSubmit={userActions.performLogin} loginError={error} />;
        }

        return (
            <div className="User content-container">
                <span className="welcome-text">{`Welcome ${name ? name : 'Unknown user'}`}</span>
                {id && <PetList userId={id} pets={pets} petActions={petActions} />}
            </div>
        );
    }
}

User.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    pets: PropTypes.array,
    userActions: PropTypes.object.isRequired,
    petActions: PropTypes.object.isRequired,
    error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
