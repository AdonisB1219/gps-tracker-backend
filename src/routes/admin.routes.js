import { Router } from 'express';
import {
  getAdmins,
  signUpAdmin,
  updateAdmin,
  getAdmin
} from '../controller/index.js';
import {
  protectWithJwt,
} from '../middleware/index.js';

const router = Router();

router.route('/')
    .post([protectWithJwt], signUpAdmin)
    .get([protectWithJwt], getAdmins)
  

router.route('/:id')
    .put([protectWithJwt], updateAdmin)
    .get([protectWithJwt], getAdmin)


export default router;
