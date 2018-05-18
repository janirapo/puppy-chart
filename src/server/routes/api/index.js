import express from 'express';
import userRoutes from './user';
import petRoutes from './pet';

let router = express.Router();

router.use('/user', userRoutes);
router.use('/pet', petRoutes);

router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce((errors, key) => {
                errors[key] = err.errors[key].message;

                return errors;
            }, {}),
        });
    }

    return next(err);
});

export default router;
