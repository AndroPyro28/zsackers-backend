-- AlterTable
ALTER TABLE `order_details` MODIFY `order_status` ENUM('pending', 'ongoing', 'completed', 'cancelled') NOT NULL DEFAULT 'pending';
