import express from 'express';
import * as measurementService from '../../services/measurementService';
import { getMetricByName } from '../../services/metricService';
import { getPet } from '../../services/petService';
import auth from '../auth';

let router = express.Router();

router.delete('/:measurementId', auth.required, (req, res, next) => {
    const data = {
        userId: req.payload.id,
        measurementId: req.params.measurementId,
    };

    measurementService.deleteMeasurement(
        data,
        () => {
            res.send(JSON.stringify({ success: true }));
        },
        next,
    );
});

/**
 * Add new measurement to pet and return updated pet
 */
router.post('/', auth.required, (req, res, next) => {
    // first we need to retrieve correct metric based on given metric name
    getMetricByName(
        req.body.metricName,
        metricResult => {
            // after metric is retrieved, build measurement object to be inserted into db
            const measurementData = {
                ...req.body,
                user_id: req.payload.id,
                metric_id: metricResult.id,
            };
            // call add measurement
            measurementService.addMeasurement(
                measurementData,
                result => res.send(JSON.stringify(result)),
                next,
            );
        },
        next,
    );
});

export default router;
