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
            [
                {
                    name: "item_id",
                    type: "input",
                    message: "What Item_ID of the product you would like to buy?"
                },
                {
                    name: "stock_quantity",
                    type: "input",
                    message: "How many units of the product you would like to buy?",
                    validate: function (value) {
                        if (isNaN(value) === false) {

                            return true;
                        }
                        return false;
                    }
                }
            ])
        .then(function (answer) {
            var query = "SELECT * FROM products WHERE item_id = ? and stock_quantity > ?";
            /* var cost = " SELECT price*(stock_quantity = ?) FROM products WHERE item_id = 1;" */
            // connection.query(query, [answer.item_id, answer.stock_quantity], function (err, res) 
            // {
            //     if (err) throw err;
            //     console.table(res);
            //     console.log("res", res);
            //     if (res.length === 0) {
            //         console.log('Insufficient quantity!');

            //     }
            //     connection.end();
            // });
            var cost = " SELECT price*(?) FROM products WHERE item_id = ?;"
            connection.query(cost, [answer.stock_quantity, answer.item_id], function (err, res1) {
                if (err) throw err;
                console.table(res1);
                if (res1.length === 0) {
                    console.log('Insufficient quantity!');

                }
                connection.end();
            });

        });
}



     