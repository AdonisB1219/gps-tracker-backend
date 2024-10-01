-- CreateTable
CREATE TABLE `Administrator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `identificacion` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Administrator_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `ciudad` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `instagram` VARCHAR(191) NOT NULL,
    `x` VARCHAR(191) NOT NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `ruc` VARCHAR(191) NOT NULL,
    `razon_social` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(191) NOT NULL,
    `lote` VARCHAR(191) NOT NULL,
    `bodega` VARCHAR(191) NOT NULL,
    `serial` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rastreo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,
    `gpsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rastreo` ADD CONSTRAINT `Rastreo_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rastreo` ADD CONSTRAINT `Rastreo_gpsId_fkey` FOREIGN KEY (`gpsId`) REFERENCES `Gps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
