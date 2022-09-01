CREATE DATABASE mapsdb;

drop table area_of_interest;
drop table coordinate;
drop table markers;


CREATE TABLE IF NOT EXISTS area_of_interest (
    id serial ,
    zoom INT NOT NULL,
    aoi_name varchar(50) UNIQUE NOT NULL,
    display varchar(50)
);

CREATE TABLE IF NOT EXISTS coordinate (
    id serial ,
    lat  varchar(50),
    long  varchar(50),
    coordinate_name varchar(50) UNIQUE NOT NULL,
    label varchar(50)
);

CREATE TABLE IF NOT EXISTS markers (
    id serial,
    aoi_name varchar(50) NOT NULL,
    coordinate_name varchar(50) NOT NULL
);