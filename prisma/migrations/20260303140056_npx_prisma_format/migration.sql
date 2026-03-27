-- CreateTable
CREATE TABLE `Exercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sets` INTEGER NOT NULL,
    `rep_min` INTEGER NOT NULL,
    `rep_max` INTEGER NOT NULL,
    `id_workout` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_id_workout_fkey` FOREIGN KEY (`id_workout`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
