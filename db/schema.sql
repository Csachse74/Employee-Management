DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
  , name varchar(30) NOT NULL
);

CREATE TABLE employee_role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
  , title VARCHAR(30) NOT NULL
  , salary decimal(10, 2)
  , department_id INT NOT NULL
  , FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
  , first_name VARCHAR(30) NOT NULL
  , last_name varchar(30)
  , role_id INT
  , department_id INT
  , FOREIGN KEY (role_id)
  REFERENCES employee_role(id)
  ON DELETE SET NULL
  , FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);