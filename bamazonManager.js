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
        message: "Dear Manager, /n What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
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
