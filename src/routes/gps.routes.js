import { Router } from 'express';
import {
  protectWithJwt,
} from '../middleware/index.js';
import { signUpGps, updateGps } from '../controller/gps.controller.js';

const router = Router();

router.route('/')
    .post([protectWithJwt], signUpGps);

router.route('/:id')
    .put([protectWithJwt], updateGps);


export default router;
