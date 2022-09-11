/*
  Warnings:

  - You are about to alter the column `author` on the `tricks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(128)`.

*/
-- AlterTable
ALTER TABLE `tricks` MODIFY `author` VARCHAR(128) NULL;
