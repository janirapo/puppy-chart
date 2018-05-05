import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, performLogin } from 'actions/userActions';
import { fetchPet, fetchAllPets, addPet } from 'actions/petActions';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { t } from 'utils/i18n';

import PetList from 'components/Pet/PetList';
import LoginForm from 'components/common/LoginForm';
import { JWT_KEY } from 'constants/appConstants';

import './User.scss';

function mapStateToProps(state) {
    return state.user;
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators({ fetchUser, performLogin }, dispatch),
        petActions: bindActionCreators({ fetchPet, fetchAllPets, addPet }, dispatch),
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
        const { id, name, pets, userActions, petActions, error, remoteSubmit } = this.props;

        if (!id) {
            return <LoginForm onSubmit={userActions.performLogin} loginError={error} />;
        }

        return (
            <div className="User content-container">
                <span className="welcome-text">{t('welcome', { name: name ? name : t('unknown_user') })}</span>
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
