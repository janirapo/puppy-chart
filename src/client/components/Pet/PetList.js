import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as petActions from '../../actions/petActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

function mapStateToProps(state) {
    return {
        pets: state.pets,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        petActions: bindActionCreators(petActions, dispatch),
    };
}

class PetList extends Component {
    componentWillMount() {
        // HERE WE ARE TRIGGERING THE ACTION
        this.props.petActions.fetchAllPets(this.props.user.id);
    }
    render() {
        const { pets } = this.props;

        return <div className="content-container">Amount of pets: {pets ? pets.length : 0}</div>;
    }
}

PetList.propTypes = {
    pets: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(PetList);
