import { prisma } from "../db/mysql/index.js";

export const signUpMicrochip = async (req, res, next) => {
  try {
    const { celular, modelo, operadora, estado, saldo } = req.body;

    // validate emial
    const microchipExists = await prisma.microchip.findFirst({
      where: {
        celular,
      },
    });
    if (microchipExists) {
      return res.status(400).json({
        ok: false,
        message: "El celular ya ha sido registrado",
      });
    }

    const microchip = await prisma.microchip.create({
      data: {
        celular,
        modelo, operadora, estado, saldo: parseFloat(saldo) 
      },
    });

    res
      .status(201)
      .json({ ok: true, message: "Microchip creado con éxito!", microchip });
  } catch (error) {
    next(error);
  }
};

export const getMicrochip = async (req, res, next) => {
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
  
  
      if (limit){

        const microchip = await prisma.microchip.findMany({
          where: filterOptions,
          skip: skip,
          take: limit,
        });
      
          const totalAdmins = await prisma.microchip.count({
              where: filterOptions,
            });
            const totalPages = Math.ceil(totalAdmins / limit);
        
            const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  
            return res.status(200).json({
              ok: true,
              count: totalAdmins,
              next:
                page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
              previous: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
              numero_paginas: totalPages,
              data: microchip,
            });
      }
  
      const microchip = await prisma.microchip.findMany({
        where: filterOptions,
      });


      res.status(200).json({
  
        data: microchip,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getOneMicrochip = async (req, res, next) => {
    const { id } = req.params;
    try {
      const microchip = await prisma.microchip.findUnique({
        where: {
          id: parseInt(id),
        },
      });

  
      if (!microchip) {
        return res.status(404).json({
          ok: false,
          message: 'Microchip no encontrado',
        });
      }
  
  
      res.status(200).json(microchip);
    } catch (error) {
      next(error);
    }
  };

export const updateMicrochip = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { celular, modelo, operadora, estado, saldo } = req.body;
    
        // validate emial
        const microchipExists = await prisma.microchip.findFirst({
            where: {
                id: parseInt(id),
              },
        });
        if (!microchipExists) {
          return res.status(400).json({
            ok: false,
            message: "Microchip no encontrado",
          });
        }
        
        const microchip = await prisma.microchip.update({
            where: {
                id: parseInt(id),
              },
          data: {
            celular, modelo, operadora, estado, saldo: parseFloat(saldo) 
        },
        });
    
        res
          .status(201)
          .json({ ok: true, message: "Microchip actualizado con éxito!", microchip });
      } catch (error) {
        next(error);
      }
};

export const deleteMicrochip = async (req, res, next) => {
    const { id } = req.params;
    try {
        const microchip = await prisma.microchip.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!microchip) {
            return res.status(404).json({
                ok: false,
                message: 'Microchip no encontrado',
            });
        }

        await prisma.microchip.delete({
            where: {
                id: parseInt(id)
            },
        });

        res.status(200).json({
            ok: true,
            message: 'Microchip eliminado con éxito!',
        });
    } catch (error) {
        next(error);
    }
};
