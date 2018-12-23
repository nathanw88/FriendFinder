CREATE DATABASE profile_db;

USE profile_db;

CREATE TABLE IF NOT EXISTS profiles (
   id int(55)AUTO_INCREMENT NOT NULL,
   name VARCHAR(25),
   photo VARCHAR(255),
   scores VARCHAR(25),
   PRIMARY KEY (id)
);
