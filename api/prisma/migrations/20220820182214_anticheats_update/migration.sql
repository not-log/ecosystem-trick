/*
  Warnings:

  - You are about to drop the column `disable_prespeed` on the `tricks` table. All the data in the column will be lost.
  - You are about to drop the column `multiple_trigger_touches` on the `tricks` table. All the data in the column will be lost.
  - You are about to drop the column `speed_limit` on the `tricks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tricks` DROP COLUMN `disable_prespeed`,
    DROP COLUMN `multiple_trigger_touches`,
    DROP COLUMN `speed_limit`,
    ADD COLUMN `multi_touch` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `no_jump_start` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `prespeedable` BOOLEAN NULL DEFAULT false;
