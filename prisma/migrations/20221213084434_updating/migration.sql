-- AlterTable
ALTER TABLE `bundles` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order_details` MODIFY `paymentMethod` VARCHAR(191) NOT NULL DEFAULT 'cash',
    MODIFY `order_status` ENUM('pending', 'onGoing', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    MODIFY `contact` VARCHAR(191) NOT NULL DEFAULT 'Zsakers cafe',
    MODIFY `address` VARCHAR(191) NOT NULL DEFAULT 'Zsakers Cafe',
    MODIFY `transaction_type` ENUM('ONLINE', 'WALK_IN') NOT NULL DEFAULT 'ONLINE';

-- AlterTable
ALTER TABLE `users` MODIFY `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE';
