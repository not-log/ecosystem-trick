-- AlterTable
ALTER TABLE `teleports` ADD COLUMN `flat_speed` FLOAT NULL,
    ADD COLUMN `restore_pitch` BOOLEAN NULL DEFAULT false;
