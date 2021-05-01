CREATE DATABASE IF NOT EXISTS `cristyledb`;
USE `cristyledb`;

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `firstName` VARCHAR(100) NOT NULL,
   `lastName` VARCHAR(100) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `birthdate` DATE,
   `roleId` INT,
   `profileImage` VARCHAR(255),
   `deleted` TINYINT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `role` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `price` INT NOT NULL,
   `discount` TINYINT NOT NULL,
   `sizeId` INT,
   `categoryId` INT,
   `image` VARCHAR(255),
   `gender` VARCHAR(255) NOT NULL,
   `deleted` TINYINT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `sizes` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `size` VARCHAR(50),
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `category` VARCHAR(50),
   PRIMARY KEY (`id`)
);

CREATE TABLE `carts` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `userId` INT NOT NULL,
   `totalPrice` INT NOT NULL,
   `totalSaved` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `cartsProducts` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `cartId` INT NOT NULL,
   `productId` INT NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `users` ADD CONSTRAINT `FK_698ce584-e71b-48fe-8483-86a8eabd4c6c` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`);

ALTER TABLE `products` ADD CONSTRAINT `FK_eab3a062-1336-42d5-9c27-9a78c9e7acd1` FOREIGN KEY (`sizeId`) REFERENCES `sizes`(`id`);

ALTER TABLE `products` ADD CONSTRAINT `FK_cde6d275-462d-4ba8-b1fd-e9f664982cbc` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`);

ALTER TABLE `carts` ADD CONSTRAINT `FK_0fbe8ebc-6369-4974-9a00-d74cab89dc06` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

ALTER TABLE `cartsProducts` ADD CONSTRAINT `FK_7cee5d76-9b16-477f-97dd-ad065650b68d` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`);

ALTER TABLE `cartsProducts` ADD CONSTRAINT `FK_81097f98-db07-46d8-8de0-7ca42ca9f8dc` FOREIGN KEY (`productId`) REFERENCES `products`(`id`);