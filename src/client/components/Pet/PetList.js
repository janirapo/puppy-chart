import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Pet from './index';
import ModalWindow from 'components/common/ModalWindow';
import AddPetForm from './AddPetForm';
import { t } from 'utils/i18n';
import { FaPlus } from 'react-icons/lib/fa';

class PetList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addPetModalIsOpen: false,
        };
    }

    componentWillMount() {
        const { pets, userId, petActions } = this.props;
        if (pets.length === 0) {
            petActions.fetchAllPets(userId);
        }
    }

    _toggleAddPetModal = () => {
        this.setState({ addPetModalIsOpen: !this.state.addPetModalIsOpen });
    };

    _handleSubmit = values => {
        const { petActions } = this.props;

        // submit form and pass toggle modal as onSuccess callback
        petActions.addPet(values, this._toggleAddPetModal);
    };

    render() {
        const { pets, petActions } = this.props;
        const { addPetModalIsOpen } = this.state;

        return (
            <div className="content-container">
                <span>{t('pet_amount', { count: pets ? pets.length : 0 })}</span>
                {pets && pets.map(pet => <Pet key={pet.id} pet={pet} />)}

                <button type="button" className="button button--success" onClick={this._toggleAddPetModal}>
                    <div className="flx flx--space-between flx-align-center">
                        <FaPlus />
                        {t('add_pet')}
                    </div>
                </button>
                {addPetModalIsOpen && (
                    <ModalWindow
                        title={t('add_pet')}
                        body={<AddPetForm onSubmit={this._handleSubmit} handleCloseModal={this._toggleAddPetModal} />}
                    />
                )}
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
