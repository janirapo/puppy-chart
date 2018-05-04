
# Dump of table users
# ------------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` mediumtext COLLATE utf8_swedish_ci,
  `name` mediumtext COLLATE utf8_swedish_ci NOT NULL,
  `password` text COLLATE utf8_swedish_ci,
  `salt` mediumtext COLLATE utf8_swedish_ci,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

# Dump of table pets
# ------------------------------------------------------------

CREATE TABLE `pets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` mediumtext COLLATE utf8_swedish_ci NOT NULL,
  `birth_date` date DEFAULT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

# Dump of table metrics
# ------------------------------------------------------------

CREATE TABLE `metrics` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `unit` varchar(16) COLLATE utf8_swedish_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

# Dump of table measurements
# ------------------------------------------------------------

CREATE TABLE `measurements` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `metric_id` int(11) unsigned DEFAULT NULL,
  `value` float DEFAULT NULL,
  `measurement_dt` datetime DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `pet_id` int(11) unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `metric_id` (`metric_id`),
  KEY `user_id` (`user_id`),
  KEY `pet_id` (`pet_id`),
  CONSTRAINT `measurements_ibfk_1` FOREIGN KEY (`metric_id`) REFERENCES `metrics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `measurements_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `measurements_ibfk_3` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
