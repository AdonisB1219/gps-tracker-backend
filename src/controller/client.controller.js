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

export const getClients = async (req, res, next) => {
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
  
      const clients = await prisma.client.findMany({
        where: filterOptions,
        paginationOptions,
      });
  
      if (limit){
          const totalAdmins = await prisma.client.count({
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
              data: clients,
            });
      }
  
  
      res.status(200).json({
  
        data: clients,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getClient = async (req, res, next) => {
    const { id } = req.params;
    try {
      const client = await prisma.client.findUnique({
        where: {
          id: parseInt(id),
        },
      });

  
      if (!client) {
        return res.status(404).json({
          ok: false,
          message: 'Cliente no encontrado',
        });
      }
  
  
      res.status(200).json(client);
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
};

export const deleteClient = async (req, res, next) => {
    const { id } = req.params;
    try {
        const client = await prisma.client.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!client) {
            return res.status(404).json({
                ok: false,
                message: 'Cliente no encontrado',
            });
        }

        await prisma.client.delete({
            where: {
                id: parseInt(id)
            },
        });

        res.status(200).json({
            ok: true,
            message: 'Cliente eliminado con éxito!',
        });
    } catch (error) {
        next(error);
    }
};
