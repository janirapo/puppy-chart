import { Metric } from '../models';

/**
 * @param name
 * @param cb
 * @param next
 */
export const getMetricByName = (name, cb, next) => {
    Metric.findOne({ where: { name: name } })
        .then(cb)
        .catch(next);
};
