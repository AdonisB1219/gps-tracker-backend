import jwt from 'jsonwebtoken';

import { SECRETORPRIVATEKEY_JWT } from '../config/index.js';
import { prisma } from '../db/mysql/index.js';
import { createError } from '../utils/error.js';

export const protectWithJwt = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken || !bearerToken.startsWith('Bearer'))
    return res.status(401).json({ ok: false, msg: 'Invalid token!' });

  const tokenJwt = bearerToken.split(' ')[1];

  try {
    const { id } = jwt.verify(tokenJwt, SECRETORPRIVATEKEY_JWT);
    console.log("verify token", id);
    const user = await prisma.administrator.findUnique({
      where: {
        id,
      },
    });

    if (!user)
      return res.status(401).json({ ok: false, msg: 'Invalid token!' });

    req.authenticatedUser = user;


    return next();
  } catch (error) {
    return res.status(401).json({ ok: false, msg: 'Invalid token!' });
  }
};

