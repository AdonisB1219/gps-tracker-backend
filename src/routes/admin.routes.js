import { Router } from 'express';
import {
  signUpAdmin,
  updateAdmin,
} from '../controller/index.js';
import {
  protectWithJwt,
} from '../middleware/index.js';

const router = Router();

router.route('/')
    .post([protectWithJwt], signUpAdmin);

router.route('/:id')
    .put([protectWithJwt], updateAdmin);


export default router;
