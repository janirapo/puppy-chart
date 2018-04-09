import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Pet from './index';

class PetList extends Component {
    componentWillMount() {
        const { pets, userId, petActions } = this.props;
        if (pets.length === 0) {
            petActions.fetchAllPets(userId);
        }
    }
    render() {
        const { pets } = this.props;

        return (
            <div className="content-container">
                <span>Amount of pets: {pets ? pets.length : 0}</span>
                {pets && pets.map(pet => <Pet key={pet.id} pet={pet} />)}
            </div>
        );
    }
}

PetList.propTypes = {
    userId: PropTypes.number.isRequired,
    pets: PropTypes.array,
    petActions: PropTypes.object.isRequired,
};

export default PetList;
