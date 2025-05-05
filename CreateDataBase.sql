DROP  DATABASE IF EXISTS QTOS;

CREATE DATABASE QTOS;

USE QTOS;

CREATE TABLE costing_report 
(
	material_number VARCHAR(225) NOT NULL,
    description VARCHAR(225) NOT NULL,
    profit_center VARCHAR(50) NOT NULL,
    costing_date DATE NOT NULL,
    material_cost DECIMAL(8,2) NOT NULL,
    pls DECIMAL(4,3) NOT NULL,
    cost_total DECIMAL(8,2) NOT NULL,
    PRIMARY KEY(material_number)
);

select * FROM costing_report