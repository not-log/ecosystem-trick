-- DropForeignKey
ALTER TABLE `tricks` DROP FOREIGN KEY `tricks_author_id_fkey`;

-- AddForeignKey
ALTER TABLE `tricks` ADD CONSTRAINT `fk_[tricks]_[author_id]_[users]_[id]` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tricks` ADD CONSTRAINT `fk_[tricks]_[update_author_id]_[users]_[id]` FOREIGN KEY (`update_author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
