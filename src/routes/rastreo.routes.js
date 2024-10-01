import { Router } from 'express';
import {
  protectWithJwt,
} from '../middleware/index.js';
import { deleteRastreo, getRastreo, getOneRastreo, signUpRastreo, updateRastreo } from '../controller/rastreo.controller.js';

const router = Router();

router.route('/')
    .post([protectWithJwt], signUpRastreo)
    .get([protectWithJwt], getRastreo)

router.route('/:id')
    .put([protectWithJwt], updateRastreo)
    .get([protectWithJwt], getOneRastreo)
    .delete([protectWithJwt], deleteRastreo)


export default router;
