import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { DEFAULT_MODAL_STYLE } from 'constants/appConstants';
import { closePetModal, addMeasurement, removeMeasurement } from 'actions/petModalActions';
import { t } from 'utils/i18n';
import moment from 'moment';

import { METRIC_TYPES } from 'constants/appConstants';
import MeasurementList from '../../Measurement/index';

import 'components/common/ModalWindow.scss';
import './PetModal.scss';

function mapStateToProps(state) {
    return {
        ...state.petModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ closePetModal, addMeasurement, removeMeasurement }, dispatch),
    };
}

const MetricContainer = ({ metricType, measurements, onAdd, onRemove }) => {
    const metricMeasurements = measurements
        ? measurements.filter(measurement => measurement.metric.name === metricType)
        : undefined;

    return (
        <div className="metric-container">
            <div className="metric-container__title">{t(metricType)}</div>
            <div className="metric-container__chart">
                <MeasurementList
                    metricType={metricType}
                    measurements={metricMeasurements}
                    onAddMeasurement={onAdd}
                    onRemoveMeasurement={onRemove}
                />
            </div>
        </div>
    );
};

MetricContainer.propTypes = {
    metricType: PropTypes.string.isRequired,
    measurements: PropTypes.array,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

class PetModal extends Component {
    _handleAddMeasurement = (values, metricType) => {
        const { actions, pet } = this.props;
        actions.addMeasurement(pet.id, values, metricType);
    };

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
                                <span>{`${t('dob')}: ${moment(pet.birth_date).format('LL')}`}</span>
                                <span>{`${t('owner')}: ${pet.user.name}`}</span>
                                {METRIC_TYPES.map(type => (
                                    <MetricContainer
                                        key={type}
                                        metricType={type}
                                        measurements={pet.measurements}
                                        onAdd={values => this._handleAddMeasurement(values, type)}
                                        onRemove={actions.removeMeasurement}
                                    />
                                ))}
                            </div>

                            <div className="modal__footer">
                                <button type="button" className="button button--danger" onClick={actions.closePetModal}>
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
