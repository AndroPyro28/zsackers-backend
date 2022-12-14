/*
  Warnings:

  - You are about to alter the column `paymentMethod` on the `order_details` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `order_details` MODIFY `paymentMethod` VARCHAR(191) NOT NULL DEFAULT 'cash';
