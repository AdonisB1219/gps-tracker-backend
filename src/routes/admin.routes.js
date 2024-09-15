import { Router } from 'express';
import {
  getAdmins,
  signUpAdmin,
  updateAdmin,
  getAdmin,
  deleteAdmin
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
    .delete([protectWithJwt], deleteAdmin)


export default router;
