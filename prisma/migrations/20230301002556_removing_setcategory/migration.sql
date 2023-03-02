/*
  Warnings:

  - You are about to drop the column `setcategoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `set_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_setcategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `set_category` DROP FOREIGN KEY `set_category_subcategoryId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `setcategoryId`,
    ADD COLUMN `productId` INTEGER NULL;

-- DropTable
DROP TABLE `set_category`;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
