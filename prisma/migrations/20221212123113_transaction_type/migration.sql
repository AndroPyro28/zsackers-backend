-- AlterTable
ALTER TABLE `order_details` ADD COLUMN `transaction_type` ENUM('ONLINE', 'WALK_IN') NOT NULL DEFAULT 'ONLINE';
