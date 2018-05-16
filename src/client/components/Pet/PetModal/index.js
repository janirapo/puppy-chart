import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { DEFAULT_MODAL_STYLE } from 'constants/appConstants';
import { closePetModal } from 'actions/petModalActions';
import { t } from 'utils/i18n';
import moment from 'moment';

import { METRIC_TYPES } from 'constants/appConstants';

import 'components/common/ModalWindow.scss';
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

const MetricContainer = ({ metricType, measurements, unit, onAdd }) => {
    return (
        <div className="metric-container">
            <div className="metric-container__title">{t(metricType)}</div>
            {!measurements || measurements.length === 0 ? <div>{t('no_results')}</div> : <div>SHOW GRAPH</div>}
            <div className="metric-container__actions">
                <button type="button" onClick={onAdd}>{t('add_measurement')}</button>
            </div>
        </div>
    );
};

class PetModal extends Component {
    render() {
        const { isOpen, pet, loading, error, actions } = this.props;

        return (
            <div className="modal modal--pet">
                <ReactModal isOpen={isOpen} style={DEFAULT_MODAL_STYLE} contentLabel="modal__pet">
                    {error && <div>{error}</div>}
                    {loading ? (
                        <div>{t('loading')}</div>
                    ) : (
                        <div className="flx flx--column flx--space-between">
                            <div className="modal__header">
                                <div className="header__title">{pet.name}</div>
                            </div>

                            <div className="modal__body">
                                <span>{`${t('dob')}: ${moment().format('LL')}`}</span>
                                <span>{`${t('owner')}: ${pet.user.name}`}</span>
                                {METRIC_TYPES.map(type => <MetricContainer key={type} metricType={type} />)}
                            </div>

                            <div className="modal__footer">
                                <button type="button" onClick={actions.closePetModal}>
                                    {t('close')}
                                </button>
                            </div>
                        </div>
                    )}
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
