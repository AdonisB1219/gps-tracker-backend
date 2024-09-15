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

export const getAdmins = async (req, res, next) => {
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

    const admins = await prisma.administrator.findMany({
      where: filterOptions,
      paginationOptions,
    });

    if (limit){
        const totalAdmins = await prisma.administrator.count({
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
            data: admins,
          });
    }


    res.status(200).json({

      data: admins,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdmin = async (req, res, next) => {
    const { id } = req.params;
    try {
      const admin = await prisma.administrator.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      delete admin.password;
  
      if (!admin) {
        return res.status(404).json({
          ok: false,
          message: 'Admin no encontrado',
        });
      }
  
  
      res.status(200).json(admin);
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
};
