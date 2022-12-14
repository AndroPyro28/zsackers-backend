-- AlterTable
ALTER TABLE `bundles` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order_details` MODIFY `order_status` ENUM('pending', 'ongoing', 'completed') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE';
