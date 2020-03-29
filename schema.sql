create schema sampledb collate utf8mb4_0900_ai_ci;

create table user_type
(
	id int auto_increment
		primary key,
	type_name varchar(30) not null
);

create table users
(
	id int auto_increment
		primary key,
	username varchar(30) null,
	email varchar(30) null,
	type int null,
	constraint users_user_type_id_fk
		foreign key (type) references user_type (id)
);



insert into sampledb.user_type (id, type_name) values (1, 'type 2');
insert into sampledb.user_type (id, type_name) values (2, 'type 2');
insert into sampledb.user_type (id, type_name) values (3, 'type 2');

insert into sampledb.users (id, username, email, type) values (7, 'rel', 'farel2301@gmail.com', 1);
