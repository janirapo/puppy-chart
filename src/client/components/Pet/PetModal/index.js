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
import PuppyChart from '../../PuppyChart';

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
            <div className="metric-container__chart">
                {!measurements || measurements.length === 0 ? (
                    <div>{t('no_results')}</div>
                ) : (
                    <PuppyChart
                        data={{
                            chart: {
                                type: 'line',
                            },
                            title: {
                                text: 'Monthly Average Temperature',
                            },
                            subtitle: {
                                text: 'Source: WorldClimate.com',
                            },
                            xAxis: {
                                categories: [
                                    'Jan',
                                    'Feb',
                                    'Mar',
                                    'Apr',
                                    'May',
                                    'Jun',
                                    'Jul',
                                    'Aug',
                                    'Sep',
                                    'Oct',
                                    'Nov',
                                    'Dec',
                                ],
                            },
                            yAxis: {
                                title: {
                                    text: 'Temperature (°C)',
                                },
                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true,
                                    },
                                    enableMouseTracking: false,
                                },
                            },
                            series: [
                                {
                                    name: 'Tokyo',
                                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                                },
                                {
                                    name: 'London',
                                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
                                },
                            ],
                            credits: false,
                        }}
                    />
                )}
            </div>
            <div className="metric-container__actions">
                <button type="button" onClick={onAdd}>
                    {t('add_measurement')}
                </button>
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
