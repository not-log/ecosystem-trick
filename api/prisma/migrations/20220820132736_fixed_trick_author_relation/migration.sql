-- AddForeignKey
ALTER TABLE `tricks` ADD CONSTRAINT `tricks_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
