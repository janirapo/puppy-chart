import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FaPaw } from 'react-icons/lib/fa';
import { t } from 'utils/i18n';
import { openPetModal } from 'actions/petModalActions';

import './Pet.scss';

class Pet extends Component {
    // Using store dispatch from context to skip connecting to Redux
    static contextTypes = {
        store: PropTypes.object.isRequired,
    };

    _renderRow = content => (
        <div className="pet__row">
            <div className="row__icon row__icon--pre">
                <FaPaw />
            </div>
            <div className="row__content">{content}</div>
        </div>
    );

    _handleOpenPetModal = () => {
        this.context.store.dispatch(openPetModal(this.props.pet));
    };

    _getPetAge = birthDate => {
        const now = moment();
        const dob = moment(birthDate);

        const years = now.diff(dob, 'year');
        dob.add(years, 'years');
        const months = now.diff(dob, 'months');
        dob.add(months, 'months');
        const days = now.diff(dob, 'days');

        return (
            <div className="pet__age-container">
                <div className="age-container__title">{`${t('age')}:`}</div>
                <div className="age-container__content">
                    <div className="content__row">
                        {`${years} ${t('years')}, ${months} ${t('months')}, ${days} ${t('days')}`}
                    </div>
                    <div className="content__row">
                        {`(${t('in_weeks')}: ${moment().diff(moment(birthDate), 'weeks')})`}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { pet } = this.props;
        return (
            <div className="pet" title={t('open')} onClick={this._handleOpenPetModal}>
                {this._renderRow(`${t('name')}: ${pet.name}`)}
                {this._renderRow(`${t('dob')}: ${moment(pet.birth_date).format('LL')}`)}
                {this._renderRow(this._getPetAge(pet.birth_date))}
            </div>
        );
    }
}

Pet.propTypes = {
    pet: PropTypes.object.isRequired,
};

export default Pet;
