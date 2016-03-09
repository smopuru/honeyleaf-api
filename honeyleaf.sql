CREATE TABLE `paying_guests` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`area` varchar(100),
	`city` varchar(100) NOT NULL,
	`address` varchar(256) NOT NULL,
	`contact_no` varchar(10) NOT NULL,
	`alt_contact_no` varchar(10),
	`lat` DECIMAL(9,6) NOT NULL,
	`lng` DECIMAL(9,6) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL UNIQUE,
	`mobile` varchar(10) NOT NULL UNIQUE,
	`password` varchar(64) NOT NULL,
	`pg_id` bigint NOT NULL UNIQUE,
	`type` varchar(10) NOT NULL DEFAULT 'owner',
	`token` varchar(64),
	`expires_at` TIMESTAMP,
	`created_by` bigint DEFAULT '0',
	`created_at` TIMESTAMP NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `rooms` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`pg_id` bigint NOT NULL,
	`name` bigint NOT NULL UNIQUE,
	`floor_no` int(2) NOT NULL,
	`cur_bed_count` int(2) NOT NULL,
	`max_bed_count` int(2) NOT NULL,
	`amenities` longtext,
	`created_at` TIMESTAMP NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `beds` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(20) NOT NULL,
	`room_id` bigint NOT NULL UNIQUE,
	`tenant_id` bigint NOT NULL,
	`is_vacant` bool NOT NULL DEFAULT '1',
	`is_booked` bool NOT NULL DEFAULT '0',
	`rent` int(4) NOT NULL,
	`created_at` TIMESTAMP NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tenants` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`mobile` varchar(10) NOT NULL,
	`alt_mobile` varchar(10),
	`address` varchar(255),
	`type` varchar(20) NOT NULL DEFAULT 'regular',
	`bed_id` bigint NOT NULL,
	`photo_url` varchar(250),
	`from_date` DATE NOT NULL,
	`to_date` DATE NOT NULL,
	`in_notice` bool NOT NULL DEFAULT '0',
	`notice_start_date` DATE,
	`notice_days` int(2),
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tenant_stay_history` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`tenant_id` bigint NOT NULL,
	`bed_id` bigint NOT NULL,
	`from_date` DATE NOT NULL,
	`to_date` DATE,
	`created_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tenant_payments` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`tenant_id` bigint,
	`amount` int(6) NOT NULL,
	`month_paid_for` DATE NOT NULL,
	`paid_date` DATE NOT NULL,
	`type` varchar(50) NOT NULL DEFAULT 'monthly_rent',
	`created_at` TIMESTAMP NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `pg_payments` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`pg_id` bigint NOT NULL,
	`to` varchar(200) NOT NULL,
	`category` varchar(50) NOT NULL,
	`amount` FLOAT(8,2) NOT NULL,
	`date` DATE NOT NULL,
	`notes` varchar(250),
	`bill_url` varchar(250),
	`created_at` TIMESTAMP NOT NULL,
	`updated_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`pg_id`) REFERENCES `paying_guests`(`id`);

ALTER TABLE `users` ADD CONSTRAINT `users_fk1` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`);

ALTER TABLE `rooms` ADD CONSTRAINT `rooms_fk0` FOREIGN KEY (`pg_id`) REFERENCES `paying_guests`(`id`);

ALTER TABLE `beds` ADD CONSTRAINT `beds_fk0` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`);

ALTER TABLE `beds` ADD CONSTRAINT `beds_fk1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`);

ALTER TABLE `tenant_stay_history` ADD CONSTRAINT `tenant_stay_history_fk0` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`);

ALTER TABLE `tenant_stay_history` ADD CONSTRAINT `tenant_stay_history_fk1` FOREIGN KEY (`bed_id`) REFERENCES `beds`(`id`);

ALTER TABLE `tenant_payments` ADD CONSTRAINT `tenant_payments_fk0` FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`);

ALTER TABLE `pg_payments` ADD CONSTRAINT `pg_payments_fk0` FOREIGN KEY (`pg_id`) REFERENCES `paying_guests`(`id`);

