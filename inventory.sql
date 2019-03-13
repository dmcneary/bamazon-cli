DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE inventory (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(60) NULL,
    retail_price DECIMAL(8,2) NOT NULL default 0,
    stock_qty INT NOT NULL default 0,
    PRIMARY KEY (id)
);

INSERT INTO inventory (product_name, department_name, retail_price, stock_qty)
VALUES ("700c x 20/28 mm inner tube, presta valve, 48mm", "Rubber/Tires & Tubes", 7.99, 100),
("8 speed chain, 114 links", "Components/Drivetrain/Chains", 19.99, 10),
("Road brake pad inserts, Campagnolo-style, all-weather compound", "Components/Brakes/Rim/Pads", 24.99, 10),
("Seatpost clamp, 35 mm, titanium", "Components/Seatposts", 49.99, 2),
("Square taper bottom bracket, ISO, 118 mm spindle", "Components/Bearings/Bottom Brackets", 24.99, 3),
("Time trial helmet, white, large", "Equipment/Helmets", 249.99, 1),
("Carbon fiber road bike, 12-speed, 56 cm", "Bicycles/Adult/Road", 10999.99, 1),
("12-inch kid's bike, orange/neon pink", "Bicycles/Kids/12", 199.99, 4),
("Chain lubricant, dry, 12 oz", "Lubes & Cleaners/Lubes", 4.99, 20),
("Patch kit, self-adhesive", "Tools", 2.99, 62);