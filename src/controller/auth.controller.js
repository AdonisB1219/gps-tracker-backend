import bcryptjs from 'bcryptjs';

import { prisma } from '../db/mysql/index.js';
import { genJWT } from '../helpers/index.js';
import { createError } from '../utils/error.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body;


  try {
    const admin = await prisma.administrator.findFirst({
      where: {
        email: email
      },
    });
    if (!admin)
      return next(
        createError(
          401,
          'Hubo un problema al iniciar sesión. Verifique su correo electrónico y contraseña o cree una cuenta.'
        )
      );
    const matchPass = await bcryptjs.compare(password, admin?.password);
    if (!matchPass)
      return next(
        createError(
          401,
          'Hubo un problema al iniciar sesión. Verifique su correo electrónico y contraseña o cree una cuenta.'
        )
      );

    delete admin.password;

    // validate if is veterinarian, tutor or admin

    const userBody = {
      ...admin
    };

    // Gen JWT
    const token = await genJWT(admin.id);

    res.status(200).json({
      ok: true,
      message: 'Inicio de sesión exitoso!',
      user: userBody,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const renewJwt = async (req, res) => {
  const { authenticatedUser } = req;
  if (!authenticatedUser)
    res.status(401).json({ ok: false, msg: 'Unathorized!' });

  // Gen JWT
  const token = await genJWT(authenticatedUser.id);

  res.status(200).json({
    ok: true,
    token,
    user: authenticatedUser,
  });
};
