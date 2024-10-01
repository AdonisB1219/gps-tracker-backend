-- CreateTable
CREATE TABLE "Administrator" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "x" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "razon_social" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gps" (
    "id" SERIAL NOT NULL,
    "modelo" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "bodega" TEXT NOT NULL,
    "serial" TEXT NOT NULL,

    CONSTRAINT "Gps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rastreo" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "gpsId" INTEGER NOT NULL,
    "referencia" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rastreo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_email_key" ON "Administrator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Rastreo" ADD CONSTRAINT "Rastreo_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rastreo" ADD CONSTRAINT "Rastreo_gpsId_fkey" FOREIGN KEY ("gpsId") REFERENCES "Gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
