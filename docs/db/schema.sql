-- Dump of table users

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` mediumtext COLLATE utf8_swedish_ci,
  `name` mediumtext COLLATE utf8_swedish_ci NOT NULL,
  `password` text COLLATE utf8_swedish_ci,
  `salt` mediumtext COLLATE utf8_swedish_ci,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- Dump of table Metrics

DROP TABLE IF EXISTS `Metrics`;

CREATE TABLE `Metrics` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `unit` varchar(16) COLLATE utf8_swedish_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

INSERT INTO `Metrics` (`name`, `unit`, `created_at`, `updated_at`)
VALUES	('weight','kg',NOW(),NULL);

INSERT INTO `Metrics` (`name`, `unit`, `created_at`, `updated_at`)
VALUES	('height','cm',NOW(),NULL);

-- Dump of table Pets

DROP TABLE IF EXISTS `Pets`;

CREATE TABLE `Pets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` mediumtext COLLATE utf8_swedish_ci NOT NULL,
  `birth_date` date DEFAULT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `active_flag` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- Dump of table Measurements

DROP TABLE IF EXISTS `Measurements`;

CREATE TABLE `Measurements` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `metric_id` int(11) unsigned DEFAULT NULL,
  `value` float DEFAULT NULL,
  `measurement_dt` datetime DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `pet_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `metric_id` (`metric_id`),
  KEY `added_by_user_id` (`user_id`),
  KEY `pet_id` (`pet_id`),
  CONSTRAINT `measurements_ibfk_1` FOREIGN KEY (`metric_id`) REFERENCES `Metrics` (`id`),
  CONSTRAINT `measurements_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `measurements_ibfk_3` FOREIGN KEY (`pet_id`) REFERENCES `Pets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
