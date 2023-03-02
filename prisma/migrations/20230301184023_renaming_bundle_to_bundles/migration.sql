/*
  Warnings:

  - You are about to drop the `bundle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bundle` DROP FOREIGN KEY `Bundle_bundleChildProductId_fkey`;

-- DropForeignKey
ALTER TABLE `bundle` DROP FOREIGN KEY `Bundle_bundleParentProductId_fkey`;

-- DropTable
DROP TABLE `bundle`;

-- CreateTable
CREATE TABLE `Bundles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bundleParentProductId` INTEGER NOT NULL,
    `bundleChildProductId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bundles` ADD CONSTRAINT `Bundles_bundleParentProductId_fkey` FOREIGN KEY (`bundleParentProductId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bundles` ADD CONSTRAINT `Bundles_bundleChildProductId_fkey` FOREIGN KEY (`bundleChildProductId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
