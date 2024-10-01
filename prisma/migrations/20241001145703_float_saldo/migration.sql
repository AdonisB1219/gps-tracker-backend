/*
  Warnings:

  - You are about to alter the column `saldo` on the `Rastreo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Rastreo` MODIFY `saldo` DOUBLE NOT NULL;
