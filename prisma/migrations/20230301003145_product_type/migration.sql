-- AlterTable
ALTER TABLE `products` MODIFY `productType` ENUM('SINGLE', 'BUNDLE') NOT NULL DEFAULT 'SINGLE';
