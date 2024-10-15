/*
  Warnings:

  - Added the required column `estado` to the `Rastreo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rastreo" ADD COLUMN     "estado" TEXT NOT NULL;
