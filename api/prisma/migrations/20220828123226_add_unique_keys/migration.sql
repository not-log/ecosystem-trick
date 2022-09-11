/*
  Warnings:

  - A unique constraint covering the columns `[map_id,name]` on the table `ref_triggers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[map_id,name]` on the table `tricks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `tricks_name_key` ON `tricks`;

-- CreateIndex
CREATE UNIQUE INDEX `ref_triggers_map_id_name_key` ON `ref_triggers`(`map_id`, `name`);

-- CreateIndex
CREATE UNIQUE INDEX `tricks_map_id_name_key` ON `tricks`(`map_id`, `name`);
