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
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT item_id, product_name, department_name, year, price,stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        question1();
    });
}

function question1() {
    inquirer
        .prompt(
            {
            name: "item_id",
            type: "input",
            message: "What Item_ID of the product you would like to buy?"
        })
        .then(function (answer1) {
            var query = "SELECT item_id, product_name, department_name, year, price,stock_quantity FROM products WHERE ?";
            connection.query(query, answer1, function (err, res) {
                if (err) throw err;
                console.table(res);
                question2();
            });
        });
        
}
function question2() {
    inquirer
        .prompt(
            
            {

                name: "stock_quantity",
                type: "input",
                message: "How many units of the product you would like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                   
                    return true;
                    }
                    return false;
                  }
            }
        )
        .then(function (answer2) {
           // var query = "select price*stock_quantity as cost from products";

            var query ="select * from products where item_id=5 and stock_quantity >?";
            connection.query(query, [answer2.stock_quantity], function (err, res) {
                if (err) throw err;
                console.table(res);
            

            });            
        });
}




/* Create a new Node application called bamazonManager.js. Running this application will:


List a set of menu options:
View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
 */



