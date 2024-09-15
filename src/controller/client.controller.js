import { prisma } from "../db/mysql/index.js";

export const signUpClient = async (req, res, next) => {
  try {
    const { name, province, city, address, phone, email, instagram, x, cedula, ruc, razonSocial } = req.body;

    // validate emial
    const userExists = await prisma.client.findFirst({
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


    const user = await prisma.client.create({
      data: {
        name, province, city, address, phone, email, instagram, x, cedula, ruc, razon_social: razonSocial
      },
    });

    res
      .status(201)
      .json({ ok: true, message: "Cliente creado con éxito!", user });
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, province, city, address, phone, email, instagram, x, cedula, ruc, razonSocial } = req.body;
    
        // validate emial
        const userExists = await prisma.client.findFirst({
            where: {
                id: parseInt(id),
              },
        });
        if (!userExists) {
          return res.status(400).json({
            ok: false,
            message: "Cliente no encontrado",
          });
        }
        
        const user = await prisma.client.update({
            where: {
                id: parseInt(id),
              },
          data: {
            name, province, city, address, phone, email, instagram, x, cedula, ruc, razon_social: razonSocial
        },
        });
    
        res
          .status(201)
          .json({ ok: true, message: "Cliente actualizado con éxito!", user });
      } catch (error) {
        next(error);
      }
}
