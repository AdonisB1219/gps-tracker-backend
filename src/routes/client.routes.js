import { Router } from 'express';
import {
  protectWithJwt,
} from '../middleware/index.js';
import { signUpClient, updateClient } from '../controller/client.controller.js';

const router = Router();

router.route('/')
    .post([protectWithJwt], signUpClient);

router.route('/:id')
    .put([protectWithJwt], updateClient);


export default router;
