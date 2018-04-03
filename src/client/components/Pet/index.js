import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Pet extends Component {
    render() {
        const { pet } = this.props;
        return (
            <div>
                <ul>
                    <li>Name: {pet.name}</li>
                    <li>Birthday: {moment(pet.birth_date).format('Do MMMM')}</li>
                    <li>Age in years: {moment().diff(moment(pet.birth_date), 'years')}</li>
                    <li>Age in months: {moment().diff(moment(pet.birth_date), 'months')}</li>
                    <li>Age in weeks: {moment().diff(moment(pet.birth_date), 'weeks')}</li>
                </ul>
            </div>
        );
    }
}

Pet.propTypes = {
    pet: PropTypes.object.isRequired,
};

export default Pet;
