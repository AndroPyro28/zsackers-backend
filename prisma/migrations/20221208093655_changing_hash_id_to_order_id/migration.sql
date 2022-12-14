/*
  Warnings:

  - You are about to drop the column `hash_id` on the `order_details` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bundles` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order_details` DROP COLUMN `hash_id`,
    ADD COLUMN `order_id` VARCHAR(191) NOT NULL,
    MODIFY `order_status` ENUM('pending', 'ongoing', 'completed') NOT NULL DEFAULT 'pending';
