import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import PropTypes from 'prop-types';

class PuppyChart extends Component {
    render() {
        const chartConfig = {
            ...this.props.data,
        };

        return <ReactHighcharts config={chartConfig} />;
    }
}

PuppyChart.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PuppyChart;
