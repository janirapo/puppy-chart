import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as petActions from '../../actions/petActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PetList from '../Pet/PetList';

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
        const { userActions } = this.props;
        // HERE WE ARE TRIGGERING THE ACTION
        userActions.fetchUser(1); // TODO: Replace static userID
    }
    render() {
        const { id, name, pets, petActions } = this.props;

        return (
            <div className="User content-container">
                <span>{`Welcome ${name ? name : 'Unknown user'}`}</span>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
