DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
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

# Manager queries 

#If a manager selects View Products for Sale, the app should list every avaitem_idilable item: the item IDs, names, prices, and quantities.
USE bamazon;
SELECT * FROM products;

#If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
SELECT * FROM products order by stock_quantity;
SELECT * FROM products order by price;

#If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
UPDATE products SET stock_quantity = 7 WHERE item_id = 1;

#If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
INSERT INTO products ( product_name, department_name, year, price,stock_quantity)
VALUES ("Macy", "Dress", 2019, 10, 5); 