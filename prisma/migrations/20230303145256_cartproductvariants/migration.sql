/*
  Warnings:

  - You are about to drop the `cart_product_flavor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart_product_flavor` DROP FOREIGN KEY `cart_product_flavor_cart_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `cart_product_flavor` DROP FOREIGN KEY `cart_product_flavor_productId_fkey`;

-- DropTable
DROP TABLE `cart_product_flavor`;

-- CreateTable
CREATE TABLE `Cart_Product_Variants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `cart_product_id` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart_Product_Variants` ADD CONSTRAINT `Cart_Product_Variants_cart_product_id_fkey` FOREIGN KEY (`cart_product_id`) REFERENCES `cart_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart_Product_Variants` ADD CONSTRAINT `Cart_Product_Variants_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
