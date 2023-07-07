-- CreateTable
CREATE TABLE `seats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `reservation_status` ENUM('IN_PROGRESS', 'RESERVED') NOT NULL DEFAULT 'IN_PROGRESS',
    `reservation_mail` VARCHAR(191) NULL,
    `reservation_starts` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reservation_ends` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
