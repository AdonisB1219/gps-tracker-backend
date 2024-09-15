-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,
    `ciudad` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `instagram` VARCHAR(191) NOT NULL,
    `x` VARCHAR(191) NOT NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `ruc` VARCHAR(191) NOT NULL,
    `razon_social` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serial` VARCHAR(191) NOT NULL,
    `clienteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Gps` ADD CONSTRAINT `Gps_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
