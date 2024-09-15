/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the `Administrador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `Gps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Gps` DROP FOREIGN KEY `Gps_clienteId_fkey`;

-- AlterTable
ALTER TABLE `Gps` DROP COLUMN `clienteId`,
    ADD COLUMN `clientId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Administrador`;

-- DropTable
DROP TABLE `Cliente`;

-- CreateTable
CREATE TABLE `Administrator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `instagram` VARCHAR(191) NOT NULL,
    `x` VARCHAR(191) NOT NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `ruc` VARCHAR(191) NOT NULL,
    `razon_social` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Gps` ADD CONSTRAINT `Gps_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
