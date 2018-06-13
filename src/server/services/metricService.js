import { Metric } from '../models';

/**
 * Get metric by name
 * @param name
 */
export const getMetricByName = (name) => {
    return Metric.findOne({ where: { name: name } });
};
