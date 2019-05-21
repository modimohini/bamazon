var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // my port; 
    port: 3307,

    // my username
    user: "root",

    // my password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Dear Manager, What would you like to do?",
            choices: [
                "View ALL available Products for Sale",
                "View Specific Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View ALL available Products for Sale":
                    allSaleSearch();
                    break;

                case "View Specific Products for Sale":
                    saleSearch();
                    break;

                case "View Low Inventory":
                    lowInventorySearch();
                    break;

                case "Add to Inventory":
                    AddInventory();
                    break;

                case "Add New Product":
                    AddNewProduct();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function allSaleSearch() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        console.table(res);
        runSearch();
    });
}

function saleSearch() {
    inquirer
        .prompt({
            name: "product_name",
            type: "input",
            message: "View Specific Products for Sale?"
        })
        .then(function (answer) {
            var query = "SELECT * FROM products where?";
            connection.query(query, { product_name: answer.product_name }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("Position: " + res[i].item_id + 
                    " || Product Name: " + res[i].product_name +
                     " || Price: " + res[i].price + 
                     " || stock_quantity " + res[i].stock_quantity);
                }
                runSearch();
            });
        });
}

function lowInventorySearch() {
    var query = "SELECT * FROM products order by stock_quantity";
    connection.query(query, function (err, res) {
        console.table(res);
        runSearch();
    });
}

function AddInventory() {
inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "Enter item_id for the product you want to add/update inventory: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "Enter stock_quantity: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
        //UPDATE products SET stock_quantity = 7 WHERE item_id = 1;
        var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
        connection.query(query, [answer.stock_quantity, answer.item_id], function(err, res) {
          //for (var i = 0; i < res.length; i++) 
          {
            console.table(res);
          }
          runSearch();
        });
      });
}
/* function AddNewProduct() {
    var query = "INSERT INTO products ( product_name, department_name, year, price,stock_quantity)
    VALUES ("Macy", "Dress", 2019, 10, 5)";
    connection.query(query, function (err, res) {
        console.table(res);
        runSearch();
    });
} */

