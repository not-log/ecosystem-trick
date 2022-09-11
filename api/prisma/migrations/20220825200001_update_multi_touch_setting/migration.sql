/*
  Warnings:

  - You are about to drop the column `multi_touch` on the `tricks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tricks` DROP COLUMN `multi_touch`,
    ADD COLUMN `loop_count` INTEGER NULL DEFAULT 2;
