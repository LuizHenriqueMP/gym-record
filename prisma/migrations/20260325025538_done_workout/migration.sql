-- CreateTable
CREATE TABLE `DoneWorkout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoneExercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_exercise` INTEGER NOT NULL,
    `id_done_workout` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Set` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reps` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `id_done_exercise` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DoneExercise` ADD CONSTRAINT `DoneExercise_id_exercise_fkey` FOREIGN KEY (`id_exercise`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoneExercise` ADD CONSTRAINT `DoneExercise_id_done_workout_fkey` FOREIGN KEY (`id_done_workout`) REFERENCES `DoneWorkout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set` ADD CONSTRAINT `Set_id_done_exercise_fkey` FOREIGN KEY (`id_done_exercise`) REFERENCES `DoneExercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
