/*
  Warnings:

  - Added the required column `id_workout` to the `DoneWorkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doneworkout` ADD COLUMN `id_workout` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `DoneWorkout` ADD CONSTRAINT `DoneWorkout_id_workout_fkey` FOREIGN KEY (`id_workout`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
