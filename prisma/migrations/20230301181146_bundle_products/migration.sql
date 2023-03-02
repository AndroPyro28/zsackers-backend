-- CreateTable
CREATE TABLE `Bundle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bundleParentProductId` INTEGER NOT NULL,
    `bundleChildProductId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bundle` ADD CONSTRAINT `Bundle_bundleParentProductId_fkey` FOREIGN KEY (`bundleParentProductId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bundle` ADD CONSTRAINT `Bundle_bundleChildProductId_fkey` FOREIGN KEY (`bundleChildProductId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
