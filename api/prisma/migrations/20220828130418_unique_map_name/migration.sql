/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ref_maps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ref_maps_name_key` ON `ref_maps`(`name`);
