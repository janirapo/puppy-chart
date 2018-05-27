import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DEFAULT_CHART_CONFIG, DEFAULT_METRIC_UNITS, METRIC_TYPES } from '../../constants/appConstants';
import PuppyChart from '../PuppyChart';
import { t } from '../../utils/i18n';
import sortBy from 'lodash/sortBy';
import AddMeasurementForm from './AddMeasurementForm';
import { FaPlus, FaCaretUp, FaCaretRight } from 'react-icons/lib/fa';

const MeasurementRow = ({ measurement, removeAction }) => (
    <tr>
        <td>{moment(measurement.measurement_dt).format('ll')}</td>
        <td>{`${measurement.value} ${measurement.metric.unit}`}</td>
        <td>{moment(measurement.created_at).format('ll')}</td>
        <td>
            <button type="button" className="button button--danger" onClick={() => removeAction(measurement.id)}>
                {t('remove')}
            </button>
        </td>
    </tr>
);

class MeasurementList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMeasurementRows: false,
            showMeasurementForm: false,
        };
    }

    _toggleMeasurementRows = () => {
        this.setState({ showMeasurementRows: !this.state.showMeasurementRows });
    };

    _toggleAddMeasurementForm = () => {
        this.setState({ showMeasurementForm: !this.state.showMeasurementForm });
    };

    _handleAddMeasurement = values => {
        this.props.onAddMeasurement(values);
        this.setState({ showMeasurementForm: false });
    };

    render() {
        const { measurements, metricType, onRemoveMeasurement } = this.props;
        const { showMeasurementRows, showMeasurementForm } = this.state;

        const hasMeasurements = measurements && measurements.length > 0;
        const unitText = DEFAULT_METRIC_UNITS[metricType];

        return (
            <div className="Measurement">
                {!hasMeasurements ? (
                    <div>{t('no_results')}</div>
                ) : (
                    <PuppyChart
                        data={{
                            ...DEFAULT_CHART_CONFIG,
                            legend: {
                                enabled: false,
                            },
                            yAxis: {
                                ...DEFAULT_CHART_CONFIG.yAxis,
                                title: {
                                    text: unitText,
                                },
                            },
                            series: [
                                {
                                    type: 'line',
                                    color: '#b18d5e',
                                    width: '2px',
                                    data: sortBy(
                                        measurements.map(measurement => [
                                            +moment(measurement.measurement_dt).format('x'),
                                            measurement.value,
                                        ]),
                                    ),
                                    animation: {
                                        duration: 500,
                                    },
                                    marker: {
                                        enabled: true,
                                        symbol: 'circle',
                                        fillColor: '#FFFFFF',
                                        lineWidth: 1,
                                        lineColor: null, // inherit from series
                                    },
                                },
                            ],
                        }}
                    />
                )}
                {showMeasurementRows && (
                    <div className="Measurement__rows">
                        <table className="measurement-table">
                            <thead>
                                <tr>
                                    <th>{t('date')}</th>
                                    <th>{t('value')}</th>
                                    <th>{t('created')}</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {measurements.map(measurement => (
                                    <MeasurementRow
                                        key={measurement.id}
                                        measurement={measurement}
                                        removeAction={onRemoveMeasurement}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="Measurement__actions">
                    {hasMeasurements && (
                        <button type="button" className="button" onClick={this._toggleMeasurementRows}>
                            <div className="flx flx--space-evenly flx-align-center">
                                {showMeasurementRows ? <FaCaretUp /> : <FaCaretRight />}
                                {t(showMeasurementRows ? 'hide_measurement_rows' : 'show_measurement_rows')}
                            </div>
                        </button>
                    )}
                    {showMeasurementForm ? (
                        <AddMeasurementForm
                            onSubmit={this._handleAddMeasurement}
                            onCancel={this._toggleAddMeasurementForm}
                            unit={unitText}
                        />
                    ) : (
                        <button
                            type="button"
                            className="button button--success"
                            onClick={this._toggleAddMeasurementForm}
                        >
                            <div className="flx flx--space-between flx-align-center">
                                <FaPlus />
                                {t('add_measurement')}
                            </div>
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

MeasurementList.propTypes = {
    measurements: PropTypes.array,
    metricType: PropTypes.oneOf(METRIC_TYPES).isRequired,
    onAddMeasurement: PropTypes.func.isRequired,
    onRemoveMeasurement: PropTypes.func.isRequired,
};

export default MeasurementList;
