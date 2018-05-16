import express from 'express';

let router = express.Router();

router.use('/user', require('./user'));
router.use('/pet', require('./pet'));

router.use((err, req, res, next) => {
    if(err.name === 'ValidationError'){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce((errors, key) => {
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }

    return next(err);
});

module.exports = router;
