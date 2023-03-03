/*
  Warnings:

  - Added the required column `cart_product_id` to the `cart_product_flavor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `cart_product_flavor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_product_flavor` ADD COLUMN `cart_product_id` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `cart_product_flavor` ADD CONSTRAINT `cart_product_flavor_cart_product_id_fkey` FOREIGN KEY (`cart_product_id`) REFERENCES `cart_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
