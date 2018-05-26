CREATE SCHEMA IF NOT EXISTS `eventos` DEFAULT CHARACTER SET utf8 ;
USE `eventos` ;
CREATE TABLE IF NOT EXISTS `eventos`.`usuarios` (
`id` INT NOT NULL AUTO_INCREMENT,
`nombreusuario` varchar(255) NOT NULL,
`password` varchar(255) NOT NULL,
`nombre` varchar(255) NOT NULL,
`apellidos` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL,
PRIMARY KEY(`id`),
UNIQUE KEY `nombreusuario` (`nombreusuario`),
UNIQUE KEY `email` (`email`)
) ;
	