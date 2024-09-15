/*
  Warnings:

  - You are about to drop the column `rolId` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Cliente` DROP FOREIGN KEY `Cliente_rolId_fkey`;

-- AlterTable
ALTER TABLE `Cliente` DROP COLUMN `rolId`;

-- DropTable
DROP TABLE `Roles`;

-- CreateTable
CREATE TABLE `Administrador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
