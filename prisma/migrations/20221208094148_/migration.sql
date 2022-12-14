/*
  Warnings:

  - Added the required column `address` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bundles` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order_details` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    MODIFY `order_status` ENUM('pending', 'ongoing', 'completed') NOT NULL DEFAULT 'pending';
