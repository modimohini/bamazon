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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT item_id, product_name, department_name, year, price,stock_quantity FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    question1();    
  });
}

  function question1() {
    inquirer
      .prompt({
        name: "item_id",
        type: "input",
        message: "What ID of the product they would like to buy?"
      })
      .then(function(answer) {
        var query = "SELECT item_id, product_name, department_name, year, price,stock_quantity FROM products WHERE ?";
        connection.query(query,answer,function(err, res) {
            if (err) throw err;
            console.table(res);          
          connection.end();
        });
      });
  }




/* The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy. */