/*
  Warnings:

  - You are about to drop the column `cedula` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `razon_social` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `ruc` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `x` on the `Client` table. All the data in the column will be lost.
  - Added the required column `identificacion` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "cedula",
DROP COLUMN "instagram",
DROP COLUMN "razon_social",
DROP COLUMN "ruc",
DROP COLUMN "x",
ADD COLUMN  "identificacion" TEXT NOT NULL DEFAULT 'temp_value';
