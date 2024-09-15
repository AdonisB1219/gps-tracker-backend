import { Router } from 'express';
import {
  login,
  renewJwt,
} from '../controller/index.js';
import {
  loginRules,
  protectWithJwt,
} from '../middleware/index.js';

const router = Router();

router.post('/login', loginRules(), login);

router.get('/renew', protectWithJwt, renewJwt);

export default router;
