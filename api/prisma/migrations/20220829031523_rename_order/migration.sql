/*
  Warnings:

  - You are about to drop the column `order` on the `trick_path` table. All the data in the column will be lost.
  - Added the required column `triggerOrder` to the `trick_path` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trick_path` DROP COLUMN `order`,
    ADD COLUMN `triggerOrder` SMALLINT NOT NULL;
