import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { DEFAULT_MODAL_STYLE } from 'constants/appConstants';
import { closePetModal } from 'actions/petModalActions';
import { t } from 'utils/i18n';

import './PetModal.scss';

function mapStateToProps(state) {
    return {
        ...state.petModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ closePetModal }, dispatch),
    };
}

class PetModal extends Component {
    render() {
        const { title, isOpen, pet, loading, error, actions } = this.props;

        return (
            <div className="modal">
                <ReactModal isOpen={isOpen} style={DEFAULT_MODAL_STYLE} contentLabel={title}>
                    {title && (
                        <div className="modal__header">
                            <div className="header__title">{title}</div>
                        </div>
                    )}

                    <div className="modal__body">
                        {Object.keys(pet).map(key => <span key={key}>{`${key}: ${pet[key]}`}</span>)}
                    </div>

                    <div className="modal__footer">
                        <button type="button" onClick={actions.closePetModal}>
                            {t('close')}
                        </button>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

PetModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    pet: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    actions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PetModal);
