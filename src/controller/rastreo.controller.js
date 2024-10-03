import { prisma } from "../db/mysql/index.js";

export const signUpRastreo = async (req, res, next) => {
  try {
    const {
      clientId,
      gpsId,
      referencia,
      celular,
      saldo,
      fechaInicio,
      fechaFin,
    } = req.body;

    // validate emial
    const gpsExists = await prisma.rastreo.findFirst({
      where: {
        gpsId,
      },
    });
    if (gpsExists) {
      return res.status(400).json({
        ok: false,
        message: "El gps ya ha sido registrado",
      });
    }

    const rastreo = await prisma.rastreo.create({
      data: {
        clientId,
        gpsId,
        referencia,
        celular,
        saldo,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      },
    });

    res
      .status(201)
      .json({ ok: true, message: "Rastreo creado con éxito!", rastreo });
  } catch (error) {
    next(error);
  }
};

export const getRastreo = async (req, res, next) => {
  try {
    const page = +req.query.page;
    const limit = +req.query.page_size;
    const search = req.query?.nombre;
    const skip = (page - 1) * limit;

    const filterOptions = search
      ? {
          name: {
            contains: search,
          },
        }
      : {};

    if (limit) {
      const rastreo = await prisma.rastreo.findMany({
        where: filterOptions,
        skip: skip,
        take: limit,
        include: {
          client: {
            select: {
              nombre: true,
              apellidos: true,
              email: true
            }
          },
          gps: {
            select: {
              serial: true,
              bodega: true
            }
          },
        }
      });
      const totalAdmins = await prisma.rastreo.count({
        where: filterOptions,
      });
      const totalPages = Math.ceil(totalAdmins / limit);

      const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

      return res.status(200).json({
        ok: true,
        count: totalAdmins,
        next:
          page < totalPages
            ? `${baseUrl}?page=${page + 1}&limit=${limit}`
            : null,
        previous:
          page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
        numero_paginas: totalPages,
        data: rastreo,
      });
    }
    const rastreo = await prisma.rastreo.findMany({
      where: filterOptions,
      include: {
        client: {
          select: {
            nombre: true,
            apellidos: true,
            email: true
          }
        },
        gps: {
          select: {
            serial: true,
            bodega: true
          }
        },
      }
    });

    res.status(200).json({
      data: rastreo,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneRastreo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rastreo = await prisma.rastreo.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        client: {
          select: {
            nombre: true,
            apellidos: true,
            email: true
          }
        },
        gps: {
          select: {
            serial: true,
            bodega: true
          }
        },
      }
    });

    if (!rastreo) {
      return res.status(404).json({
        ok: false,
        message: "Rastreo no encontrado",
      });
    }

    res.status(200).json(rastreo);
  } catch (error) {
    next(error);
  }
};

export const updateRastreo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clientId,
      gpsId,
      referencia,
      celular,
      saldo,
      fechaInicio,
      fechaFin, } = req.body;

    // validate emial
    const gpsExists = await prisma.rastreo.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    if (!gpsExists) {
      return res.status(400).json({
        ok: false,
        message: "Rastreo no encontrado",
      });
    }

    const gps = await prisma.rastreo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        clientId,
        gpsId,
        referencia,
        celular,
        saldo,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      },
    });

    res
      .status(201)
      .json({ ok: true, message: "rastreo actualizado con éxito!", gps });
  } catch (error) {
    next(error);
  }
};

export const deleteRastreo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rastreo = await prisma.rastreo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!rastreo) {
      return res.status(404).json({
        ok: false,
        message: "Rastreo no encontrado",
      });
    }

    await prisma.rastreo.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      ok: true,
      message: "Rastreo eliminado con éxito!",
    });
  } catch (error) {
    next(error);
  }
};
