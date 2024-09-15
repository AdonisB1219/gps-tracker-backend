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

export const getGps = async (req, res, next) => {
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
  
      const paginationOptions = limit? {
          skip: skip,
          take: limit,
      } :
      undefined;
  
      const gps = await prisma.gps.findMany({
        where: filterOptions,
        paginationOptions,
      });
  
      if (limit){
          const totalAdmins = await prisma.gps.count({
              where: filterOptions,
            });
            const totalPages = Math.ceil(totalAdmins / limit);
        
            const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  
            res.status(200).json({
              ok: true,
              count: totalAdmins,
              next:
                page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
              previous: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
              numero_paginas: totalPages,
              data: gps,
            });
      }
  
  
      res.status(200).json({
  
        data: gps,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getOneGps = async (req, res, next) => {
    const { id } = req.params;
    try {
      const gps = await prisma.gps.findUnique({
        where: {
          id: parseInt(id),
        },
      });

  
      if (!gps) {
        return res.status(404).json({
          ok: false,
          message: 'Gps no encontrado',
        });
      }
  
  
      res.status(200).json(gps);
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
};
