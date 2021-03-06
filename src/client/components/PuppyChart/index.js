import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import PropTypes from 'prop-types';

class PuppyChart extends Component {
    render() {
        return <ReactHighcharts config={this.props.data} />;
    }
}

PuppyChart.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PuppyChart;
