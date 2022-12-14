/*
  Warnings:

  - You are about to alter the column `order_status` on the `order_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `bundles` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order_details` MODIFY `delivery_status` INTEGER NOT NULL DEFAULT 0,
    MODIFY `order_status` ENUM('pending', 'ongoing', 'completed') NOT NULL DEFAULT 'pending';
