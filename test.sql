drop database if exists test_evento;
create database test_evento CHARACTER SET utf8 COLLATE utf8_general_ci;

use test_evento;

drop table if exists eventos;
create table eventos (
	id_evento int auto_increment,
    titulo varchar(200) not null,
    descripcion text, 
    categoria varchar(60),
    lat double(40, 20),
    lng double(40, 20),
    primary key (id_evento)
);