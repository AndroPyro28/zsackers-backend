-- DropForeignKey
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_userId_fkey`;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
