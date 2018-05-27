import express from 'express';
import * as petService from '../../services/petService';
import auth from '../auth';

let router = express.Router();

router.get('/get-all-by-user/:userId', auth.optional, (req, res, next) => {
    petService.getAllByUser(
        req.params.userId,
        dbResult => {
            res.send(JSON.stringify({ pets: dbResult }));
        },
        next,
    );
});

router.post('/', auth.required, (req, res, next) => {

    const petData = {
        ...req.body,
        user_id: req.payload.id
    };

    // TODO: Validate that all values are set!!

    petService.addPet(
        petData,
        dbResult => {
            res.send(JSON.stringify(dbResult));
        },
        next,
    );
});

router.delete('/:petId', auth.required, (req, res, next) => {
    const data = {
        userId: req.payload.id,
        petId: req.params.petId,
    };

    petService.deactivatePet(
        data,
        () => {
            res.send(JSON.stringify({ success: true }));
        },
        next,
    );
});

export default router;
