import bcryptjs from 'bcryptjs';

import { prisma } from '../db/mysql/index.js';


export const createAdminUser = async () => {


  const existingAdmin = await prisma.administrator.findFirst({
    where: {
      email: 'admin@admin.com',
    },
  });

  if (!existingAdmin) {
    try {
      const hashedPassword = await bcryptjs.hash('adminadmin', 10);

      const user = await prisma.administrator.create({
        data: {
          nombre: "admin",
          identificacion: "identificacion",
          direccion: "direccion",
          telefono: "telefono",
          email: 'admin@admin.com',
          password: hashedPassword,
        },
      });

    } catch (error) {
      console.log('Error creating admin user:', error);
      process.exit(1);
    }
  }
}; 
