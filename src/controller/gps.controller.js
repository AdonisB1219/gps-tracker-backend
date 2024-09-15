import { prisma } from "../db/mysql/index.js";
import bcryptjs from "bcryptjs";

export const signUpGps = async (req, res, next) => {
  try {
    const { serial, clientId } = req.body;

    // validate emial
    const gpsExists = await prisma.gps.findFirst({
      where: {
        serial,
      },
    });
    if (gpsExists) {
      return res.status(400).json({
        ok: false,
        message: "El serial ya ha sido registrado",
      });
    }

    const gps = await prisma.gps.create({
      data: {
        serial,
        clientId
      },
    });

    res
      .status(201)
      .json({ ok: true, message: "Usuario creado con éxito!", gps });
  } catch (error) {
    next(error);
  }
};

export const updateGps = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { serial, clientId } = req.body;
    
        // validate emial
        const gpsExists = await prisma.gps.findFirst({
            where: {
                id: parseInt(id),
              },
        });
        if (!gpsExists) {
          return res.status(400).json({
            ok: false,
            message: "Gps no encontrado",
          });
        }
        
        const gps = await prisma.gps.update({
            where: {
                id: parseInt(id),
              },
          data: {
            serial, clientId 
        },
        });
    
        res
          .status(201)
          .json({ ok: true, message: "Usuario actualizado con éxito!", gps });
      } catch (error) {
        next(error);
      }
}
