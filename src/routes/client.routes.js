import { Router } from 'express';
import {
  protectWithJwt,
} from '../middleware/index.js';
import { getClient, getClients, signUpClient, updateClient } from '../controller/client.controller.js';

const router = Router();

router.route('/')
    .post([protectWithJwt], signUpClient)
    .get([protectWithJwt], getClients)

router.route('/:id')
    .put([protectWithJwt], updateClient)
    .get([protectWithJwt], getClient)


export default router;
