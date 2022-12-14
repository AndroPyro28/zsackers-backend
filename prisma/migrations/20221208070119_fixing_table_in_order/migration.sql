/*
  Warnings:

  - Added the required column `delivery_status` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_status` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bundles` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order_details` ADD COLUMN `delivery_status` INTEGER NOT NULL,
    ADD COLUMN `order_status` VARCHAR(191) NOT NULL;
