/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `order_details` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `order_details_order_id_key` ON `order_details`(`order_id`);
