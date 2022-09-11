/*
  Warnings:

  - Made the column `auth` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `style` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `combo` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_speed` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_speed` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avg_speed` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jumps` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `strafes` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `ref_maps` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `whops` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `whops` required. This step will fail if there are existing NULL values in that column.
  - Made the column `angles` on table `whops` required. This step will fail if there are existing NULL values in that column.
  - Made the column `speed` on table `whops` required. This step will fail if there are existing NULL values in that column.
  - Made the column `speed_vector` on table `whops` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `records` DROP FOREIGN KEY `fk_[records]_[auth]_[users]_[auth]`;

-- AlterTable
ALTER TABLE `records` MODIFY `auth` INTEGER NOT NULL,
    MODIFY `style` SMALLINT NOT NULL,
    MODIFY `combo` INTEGER NOT NULL,
    MODIFY `type` TINYINT NOT NULL,
    MODIFY `time` FLOAT NOT NULL,
    MODIFY `start_speed` FLOAT NOT NULL,
    MODIFY `end_speed` FLOAT NOT NULL,
    MODIFY `avg_speed` FLOAT NOT NULL,
    MODIFY `jumps` INTEGER NOT NULL,
    MODIFY `strafes` INTEGER NOT NULL,
    MODIFY `date` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ref_maps` MODIFY `name` VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE `trick_path` MODIFY `type` TINYINT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(128) NOT NULL;

-- AlterTable
ALTER TABLE `whops` MODIFY `name` VARCHAR(32) NOT NULL,
    MODIFY `position` VARCHAR(30) NOT NULL,
    MODIFY `angles` VARCHAR(30) NOT NULL,
    MODIFY `speed` FLOAT NOT NULL,
    MODIFY `speed_vector` VARCHAR(30) NOT NULL,
    MODIFY `restore_pitch` TINYINT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `records` ADD CONSTRAINT `fk_[records]_[auth]_[users]_[auth]` FOREIGN KEY (`auth`) REFERENCES `users`(`auth`) ON DELETE CASCADE ON UPDATE CASCADE;
