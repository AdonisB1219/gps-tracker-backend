import { Router } from 'express';
import {
  protectWithJwt,
} from '../middleware/index.js';
import { deleteGps, getGps, getOneGps, signUpGps, updateGps } from '../controller/gps.controller.js';

const router = Router();

router.route('/')
    .post([protectWithJwt], signUpGps)
    .get([protectWithJwt], getGps)

router.route('/:id')
    .put([protectWithJwt], updateGps)
    .get([protectWithJwt], getOneGps)
    .delete([protectWithJwt], deleteGps)


export default router;
