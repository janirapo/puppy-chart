import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Pet from './index';
import ModalWindow from 'components/common/ModalWindow';
import AddPetForm from './AddPetForm';

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

    toggleAddPetModal = () => {
        this.setState({ addPetModalIsOpen: !this.state.addPetModalIsOpen });
    };

    render() {
        const { pets } = this.props;
        const { addPetModalIsOpen } = this.state;

        const submit = values => {
            // print the form values to the console
            console.log(values);
        };

        return (
            <div className="content-container">
                <span>Amount of pets: {pets ? pets.length : 0}</span>
                {pets && pets.map(pet => <Pet key={pet.id} pet={pet} />)}

                <button onClick={this.toggleAddPetModal}>Add pet</button>
                {addPetModalIsOpen && (
                    <ModalWindow
                        title="Add pet"
                        body={<AddPetForm onSubmit={submit} />}
                        handleClose={this.toggleAddPetModal}
                        handleAccept={() => null}
                        acceptText={'Add'}
                        closeText={'Close'}
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
