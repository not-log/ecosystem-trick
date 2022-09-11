/*
  Warnings:

  - Made the column `name` on table `tricks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tricks` MODIFY `name` VARCHAR(128) NOT NULL,
    MODIFY `max_jumps` INTEGER NULL DEFAULT -1,
    MODIFY `speed_limit` FLOAT NULL DEFAULT 0;
