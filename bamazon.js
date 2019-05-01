var mysql = require("mysql");
var inquirer = require("inquirer");

var conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1Littleme",
  database: "bamazon"
});

conn.connect(function(err) {
  if (err) throw err;
  start();
});

// fall into the code when the connection passes
function start() {
  inquirer
    .prompt({
      name: "firstQuestion",
      type: "list",
      message: "Name your type of order",
      choices: ["ID",
                "UNITS",
                "EXIT"
               ]
    })
    .then(function(answer) {
      if (answer.firstQuestion === "ID") {
        queryId();
      }
      else if(answer.firstQuestion === "UNITS") {
        queryQuantity();
      } else{
        conn.end();
      }
    });
}


function queryId() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item  ID ?"
      }
    ])
    .then(function(answer) {

      connection.query(
        "Select product_name, department_name ,price From products Where id ?",
        {
            product_name: answer.product_name,
            department_name: answer.department_name,
            price: answer.price
        },
        function(err) {
          if (err) throw err;
          start();
        }
      );
    });
}

function queryQuantity() {
  connection.query("SELECT * FROM products WHERE ", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
            name: "item",
            type: "input",
            message: "What is the item Quanity ?"
          }
        
      ])
      .then(function(answer) {
          connection.query(
            "Select * From products Where stock_quanuity?",
            {
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price
            },
            function(err) {
              if (err) throw err;
              start();
            }
          );
               
          start();
        
      });
  });
}
