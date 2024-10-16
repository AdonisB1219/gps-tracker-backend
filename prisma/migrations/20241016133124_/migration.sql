/*
  Warnings:

  - You are about to drop the column `celular` on the `Rastreo` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Rastreo` table. All the data in the column will be lost.
  - You are about to drop the column `saldo` on the `Rastreo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rastreo" DROP COLUMN "celular",
DROP COLUMN "estado",
DROP COLUMN "saldo",
ADD COLUMN     "microchipId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Microchip" (
    "id" SERIAL NOT NULL,
    "modelo" TEXT NOT NULL,
    "operadora" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Microchip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rastreo" ADD CONSTRAINT "Rastreo_microchipId_fkey" FOREIGN KEY ("microchipId") REFERENCES "Microchip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
