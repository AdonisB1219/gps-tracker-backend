/*
  Warnings:

  - Added the required column `celular` to the `Rastreo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_fin` to the `Rastreo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_inicio` to the `Rastreo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referencia` to the `Rastreo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saldo` to the `Rastreo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rastreo` ADD COLUMN `celular` VARCHAR(191) NOT NULL,
    ADD COLUMN `fecha_fin` DATETIME(3) NOT NULL,
    ADD COLUMN `fecha_inicio` DATETIME(3) NOT NULL,
    ADD COLUMN `referencia` VARCHAR(191) NOT NULL,
    ADD COLUMN `saldo` VARCHAR(191) NOT NULL;
