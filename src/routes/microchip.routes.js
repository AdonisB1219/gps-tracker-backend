import { Router } from 'express';
import {
  protectWithJwt,
} from '../middleware/index.js';
import { deleteMicrochip, getMicrochip, getOneMicrochip, signUpMicrochip, updateMicrochip } from '../controller/microchip.controller.js';

const router = Router();

router.route('/')
    .post([protectWithJwt], signUpMicrochip)
    .get([protectWithJwt], getMicrochip)

router.route('/:id')
    .put([protectWithJwt], updateMicrochip)
    .get([protectWithJwt], getOneMicrochip)
    .delete([protectWithJwt], deleteMicrochip)


export default router;
