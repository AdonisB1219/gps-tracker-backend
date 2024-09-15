import { prisma } from "../db/mysql/index.js";
import bcryptjs from "bcryptjs";

export const signUpAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validate emial
    const userExists = await prisma.administrator.findFirst({
      where: {
        email,
      },
    });
    if (userExists) {
      return res.status(400).json({
        ok: false,
        message: "El correo ya ha sido registrado",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.administrator.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    delete user.password;

    res
      .status(201)
      .json({ ok: true, message: "Usuario creado con éxito!", user });
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
    
        // validate emial
        const userExists = await prisma.administrator.findFirst({
            where: {
                id: parseInt(id),
              },
        });
        if (!userExists) {
          return res.status(400).json({
            ok: false,
            message: "Admin no encontrado",
          });
        }
    
        const hashedPassword = await bcryptjs.hash(password, 10);
    
        const user = await prisma.administrator.update({
            where: {
                id: parseInt(id),
              },
          data: {
            email,
            ...(password && { password: hashedPassword }),
        },
        });
        delete user.password;
    
        res
          .status(201)
          .json({ ok: true, message: "Usuario actualizado con éxito!", user });
      } catch (error) {
        next(error);
      }
}
