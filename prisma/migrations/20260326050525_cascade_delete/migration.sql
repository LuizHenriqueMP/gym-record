/*
  Warnings:

  - Added the required column `name` to the `DoneExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `doneexercise` DROP FOREIGN KEY `DoneExercise_id_done_workout_fkey`;

-- DropForeignKey
ALTER TABLE `doneexercise` DROP FOREIGN KEY `DoneExercise_id_exercise_fkey`;

-- DropForeignKey
ALTER TABLE `doneworkout` DROP FOREIGN KEY `DoneWorkout_id_workout_fkey`;

-- DropForeignKey
ALTER TABLE `exercise` DROP FOREIGN KEY `Exercise_id_workout_fkey`;

-- DropForeignKey
ALTER TABLE `set` DROP FOREIGN KEY `Set_id_done_exercise_fkey`;

-- DropIndex
DROP INDEX `DoneExercise_id_done_workout_fkey` ON `doneexercise`;

-- DropIndex
DROP INDEX `DoneExercise_id_exercise_fkey` ON `doneexercise`;

-- DropIndex
DROP INDEX `DoneWorkout_id_workout_fkey` ON `doneworkout`;

-- DropIndex
DROP INDEX `Exercise_id_workout_fkey` ON `exercise`;

-- DropIndex
DROP INDEX `Set_id_done_exercise_fkey` ON `set`;

-- AlterTable
ALTER TABLE `doneexercise` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_id_workout_fkey` FOREIGN KEY (`id_workout`) REFERENCES `Workout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoneWorkout` ADD CONSTRAINT `DoneWorkout_id_workout_fkey` FOREIGN KEY (`id_workout`) REFERENCES `Workout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoneExercise` ADD CONSTRAINT `DoneExercise_id_exercise_fkey` FOREIGN KEY (`id_exercise`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoneExercise` ADD CONSTRAINT `DoneExercise_id_done_workout_fkey` FOREIGN KEY (`id_done_workout`) REFERENCES `DoneWorkout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set` ADD CONSTRAINT `Set_id_done_exercise_fkey` FOREIGN KEY (`id_done_exercise`) REFERENCES `DoneExercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
