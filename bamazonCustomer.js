var mysql = require("mysql");

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
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
}
