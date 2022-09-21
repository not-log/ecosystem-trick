-- CreateTable
CREATE TABLE `teleports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `map_id` INTEGER NOT NULL,
    `trigger_id` INTEGER NULL,
    `name` VARCHAR(128) NULL,
    `origin` VARCHAR(128) NOT NULL,
    `angles` VARCHAR(128) NOT NULL,
    `velocity` VARCHAR(128) NOT NULL,

    INDEX `fk_[teleports]_[map_id]_[ref_maps]_[id]`(`map_id`),
    INDEX `fk_[teleports]_[triggerid_id]_[ref_triggers]_[id]`(`trigger_id`),
    UNIQUE INDEX `teleports_trigger_id_key`(`trigger_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- AddForeignKey
ALTER TABLE `teleports` ADD CONSTRAINT `fk_[teleports]_[map_id]_[ref_maps]_[id]` FOREIGN KEY (`map_id`) REFERENCES `ref_maps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teleports` ADD CONSTRAINT `fk_[teleports]_[triggerid_id]_[ref_triggers]_[id]` FOREIGN KEY (`trigger_id`) REFERENCES `ref_triggers`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
