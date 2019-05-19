DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  year INT NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity DECIMAL(10,4) NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;
USE bamazon;



INSERT INTO products ( item_id, product_name, department_name, year, price,stock_quantity)
VALUES (7, "Macy", "Dress", 2019, 80, 70);
INSERT INTO products ( item_id, product_name, department_name, year, price,stock_quantity)
VALUES (10, "channel", "Perfume", 2015, 650, 30);
