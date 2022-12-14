/*
  Warnings:

  - The values [ongoing] on the enum `order_details_order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order_details` MODIFY `order_status` ENUM('pending', 'onGoing', 'completed', 'cancelled') NOT NULL DEFAULT 'pending';
