/*
  Warnings:

  - Added the required column `hash_id` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bundles` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order_details` ADD COLUMN `hash_id` VARCHAR(191) NOT NULL;
