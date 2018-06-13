import express from 'express';
import * as measurementService from '../../services/measurementService';
import { getMetricByName } from '../../services/metricService';
import auth from '../auth';
import { getPet } from '../../services/petService';

let router = express.Router();

router.delete('/:measurementId', auth.required, (req, res, next) => {
    const data = {
        userId: req.payload.id,
        measurementId: req.params.measurementId,
    };

    measurementService
        .deleteMeasurement(data)
        .then(() => res.send(JSON.stringify({ success: true })))
        .catch(next);
});

/**
 * Add new measurement to pet and return updated pet
 */
router.post('/', auth.required, (req, res, next) => {
    // first we need to retrieve correct metric based on given metric name
    getMetricByName(req.body.metricName)
        .then(metricResult => {
            // after metric is retrieved, build measurement object to be inserted into db
            const measurementData = {
                ...req.body,
                user_id: req.payload.id,
                metric_id: metricResult.id,
            };
            // call add measurement
            measurementService
                .addMeasurement(measurementData)
                .then(result => res.send(JSON.stringify(result)))
                .catch(next);
        })
        .catch(next);
});

export default router;
