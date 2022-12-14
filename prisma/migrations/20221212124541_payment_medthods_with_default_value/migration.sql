/*
  Warnings:

  - You are about to alter the column `paymentMethod` on the `order_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `order_details` MODIFY `paymentMethod` ENUM('cod', 'gcash', 'cash') NOT NULL DEFAULT 'cash',
    MODIFY `contact` VARCHAR(191) NOT NULL DEFAULT 'Zsakers cafe',
    MODIFY `address` VARCHAR(191) NOT NULL DEFAULT 'Zsakers Cafe';
