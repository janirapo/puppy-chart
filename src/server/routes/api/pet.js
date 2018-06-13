import express from 'express';
import * as petService from '../../services/petService';
import auth from '../auth';
import { getPet } from '../../services/petService';

let router = express.Router();

router.get('/get-all-by-user/:userId', auth.optional, (req, res, next) => {
    petService
        .getAllByUser(req.params.userId)
        .then(dbResult => {
            res.send(JSON.stringify({ pets: dbResult }));
        })
        .catch(next);
});

router.post('/', auth.required, (req, res, next) => {
    const petData = {
        ...req.body,
        user_id: req.payload.id,
    };

    // TODO: Validate that all values are set!!

    petService
        .addPet(petData)
        .then(addedPet =>
            getPet(addedPet.id, addedPet.user_id).then(dbResult => {
                res.send(JSON.stringify(dbResult));
            }),
        )
        .catch(next);
});

router.delete('/:petId', auth.required, (req, res, next) => {
    const data = {
        userId: req.payload.id,
        petId: req.params.petId,
    };

    petService
        .deactivatePet(data)
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(next);
});

export default router;
