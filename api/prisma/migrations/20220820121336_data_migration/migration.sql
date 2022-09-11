/*
  Warnings:

  - You are about to drop the column `auth` on the `records` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `auth` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `tricks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[steam_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `tricks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steam_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `records` DROP FOREIGN KEY `fk_[records]_[auth]_[users]_[auth]`;

-- DropForeignKey
ALTER TABLE `records` DROP FOREIGN KEY `fk_[records]_[trick_id]_[tricks]_[id]`;

-- DropForeignKey
ALTER TABLE `trick_path` DROP FOREIGN KEY `fk_[trick_path]_[trigger_id]_[ref_triggers]_[id]`;

-- DropForeignKey
ALTER TABLE `tricks` DROP FOREIGN KEY `fk_[tricks]_[map_id]_[ref_maps]_[id]`;

-- DropIndex
DROP INDEX `idx_records` ON `records`;

-- AlterTable
ALTER TABLE `records` DROP COLUMN `auth`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tricks` ADD COLUMN `author` VARCHAR(191) NULL,
    ADD COLUMN `author_id` INTEGER NULL,
    ADD COLUMN `created_at` INTEGER NOT NULL,
    ADD COLUMN `update_author_id` INTEGER NULL,
    ADD COLUMN `updated_at` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `auth`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `steam_id` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(128) NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `idx_records` ON `records`(`user_id`, `trick_id`, `style`, `type`);

-- CreateIndex
CREATE UNIQUE INDEX `tricks_name_key` ON `tricks`(`name`);

-- CreateIndex
CREATE INDEX `fk_[tricks]_[author_id]_[users]_[id]` ON `tricks`(`author_id`);

-- CreateIndex
CREATE INDEX `fk_[tricks]_[update_author_id]_[users]_[id]` ON `tricks`(`update_author_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_id_key` ON `users`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_steam_id_key` ON `users`(`steam_id`);

-- AddForeignKey
ALTER TABLE `records` ADD CONSTRAINT `fk_[records]_[user_id]_[users]_[id]` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `records` ADD CONSTRAINT `fk_[records]_[trick_id]_[tricks]_[id]` FOREIGN KEY (`trick_id`) REFERENCES `tricks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trick_path` ADD CONSTRAINT `fk_[trick_path]_[trigger_id]_[ref_triggers]_[id]` FOREIGN KEY (`trigger_id`) REFERENCES `ref_triggers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tricks` ADD CONSTRAINT `fk_[tricks]_[map_id]_[ref_maps]_[id]` FOREIGN KEY (`map_id`) REFERENCES `ref_maps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
