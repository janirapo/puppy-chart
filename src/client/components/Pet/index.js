import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FaPaw } from 'react-icons/lib/fa';

import './Pet.scss';

class Pet extends Component {
    _renderRow = text => (
        <div className="pet-row">
            <div className="icon-pre"><FaPaw /></div>
            <span>{text}</span>
        </div>
    );

    render() {
        const { pet } = this.props;
        return (
            <div className="Pet">
                {this._renderRow(`Name: ${pet.name}`)}
                {this._renderRow(`Birthday: ${moment(pet.birth_date).format('Do MMMM')}`)}
                {this._renderRow(`Age in years: ${moment().diff(moment(pet.birth_date), 'years')}`)}
                {this._renderRow(`Age in months: ${moment().diff(moment(pet.birth_date), 'months')}`)}
                {this._renderRow(`Age in weeks: ${moment().diff(moment(pet.birth_date), 'weeks')}`)}
            </div>
        );
    }
}

Pet.propTypes = {
    pet: PropTypes.object.isRequired,
};

export default Pet;
