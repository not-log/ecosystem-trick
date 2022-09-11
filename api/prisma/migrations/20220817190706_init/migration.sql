-- CreateTable
CREATE TABLE `records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth` INTEGER NULL,
    `trick_id` INTEGER NOT NULL,
    `style` SMALLINT NULL DEFAULT 0,
    `combo` INTEGER NULL DEFAULT 1,
    `type` TINYINT NULL,
    `time` FLOAT NULL,
    `start_speed` FLOAT NULL,
    `end_speed` FLOAT NULL,
    `avg_speed` FLOAT NULL,
    `jumps` INTEGER NULL,
    `strafes` INTEGER NULL,
    `date` INTEGER NULL,
    `completions` SMALLINT NULL DEFAULT 0,

    INDEX `fk_[records]_[trick_id]_[tricks]_[id]`(`trick_id`),
    INDEX `idx_records`(`auth`, `trick_id`, `style`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ref_maps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author` VARCHAR(256) NULL,
    `name` VARCHAR(256) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ref_triggers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `map_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `global_passthrough` BOOLEAN NULL DEFAULT false,
    `detection_type` TINYINT NULL DEFAULT 0,

    INDEX `fk_[ref_triggers]_[map_id]_[ref_maps]_[id]`(`map_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trick_path` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trick_id` INTEGER NOT NULL,
    `trigger_id` INTEGER NOT NULL,
    `order` SMALLINT NOT NULL,
    `type` TINYINT NOT NULL DEFAULT 0,

    INDEX `fk_[trick_path]_[trick_id]_[tricks]_[id]`(`trick_id`),
    INDEX `fk_[trick_path]_[trigger_id]_[ref_triggers]_[id]`(`trigger_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tricks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `map_id` INTEGER NOT NULL,
    `name` VARCHAR(128) NULL,
    `difficulty` INTEGER NOT NULL DEFAULT 0,
    `max_jumps` INTEGER NOT NULL DEFAULT -1,
    `speed_limit` FLOAT NOT NULL DEFAULT 0,
    `disable_prespeed` BOOLEAN NULL DEFAULT false,
    `repetition_trigger` INTEGER NULL,
    `multiple_trigger_touches` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `trick_id`(`id`),
    INDEX `fk_[tricks]_[map_id]_[ref_maps]_[id]`(`map_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `auth` INTEGER NOT NULL,
    `name` VARCHAR(128) NULL,
    `ip` INTEGER NULL,

    PRIMARY KEY (`auth`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `whops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `map_id` INTEGER NOT NULL,
    `name` VARCHAR(32) NULL,
    `position` VARCHAR(30) NULL,
    `angles` VARCHAR(30) NULL,
    `speed` FLOAT NULL,
    `speed_vector` VARCHAR(30) NULL,
    `restore_pitch` TINYINT NOT NULL DEFAULT 0,

    INDEX `fk_[whops]_[map_id]_[ref_maps]_[id]`(`map_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `records` ADD CONSTRAINT `fk_[records]_[auth]_[users]_[auth]` FOREIGN KEY (`auth`) REFERENCES `users`(`auth`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `records` ADD CONSTRAINT `fk_[records]_[trick_id]_[tricks]_[id]` FOREIGN KEY (`trick_id`) REFERENCES `tricks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ref_triggers` ADD CONSTRAINT `fk_[ref_triggers]_[map_id]_[ref_maps]_[id]` FOREIGN KEY (`map_id`) REFERENCES `ref_maps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trick_path` ADD CONSTRAINT `fk_[trick_path]_[trick_id]_[tricks]_[id]` FOREIGN KEY (`trick_id`) REFERENCES `tricks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trick_path` ADD CONSTRAINT `fk_[trick_path]_[trigger_id]_[ref_triggers]_[id]` FOREIGN KEY (`trigger_id`) REFERENCES `ref_triggers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tricks` ADD CONSTRAINT `fk_[tricks]_[map_id]_[ref_maps]_[id]` FOREIGN KEY (`map_id`) REFERENCES `ref_maps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `whops` ADD CONSTRAINT `fk_[whops]_[map_id]_[ref_maps]_[id]` FOREIGN KEY (`map_id`) REFERENCES `ref_maps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
