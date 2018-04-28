import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FaPaw } from 'react-icons/lib/fa';
import { t } from 'utils/i18n';

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
                {this._renderRow(`${t('name')}: ${pet.name}`)}
                {this._renderRow(`${t('dob')}: ${moment(pet.birth_date).format('Do MMMM')}`)}
                {this._renderRow(`${t('age_in_unit', { unit: t('years')})}: ${moment().diff(moment(pet.birth_date), 'years')}`)}
                {this._renderRow(`${t('age_in_unit', { unit: t('months')})}: ${moment().diff(moment(pet.birth_date), 'months')}`)}
                {this._renderRow(`${t('age_in_unit', { unit: t('weeks')})}: ${moment().diff(moment(pet.birth_date), 'weeks')}`)}
            </div>
        );
    }
}

Pet.propTypes = {
    pet: PropTypes.object.isRequired,
};

export default Pet;
