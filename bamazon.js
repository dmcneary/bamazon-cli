var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
  }
);

var pick = {};
var inventoryArr = [];

function errorMsg(err) {
  console.log("Error occurred!");
  throw err;
}

function welcome() {
  console.log("$$$$$$$\\   $$$$$$\\  $$\\      $$\\  $$$$$$\\  $$$$$$$$\\  $$$$$$\\  $$\\   $$\\");
  console.log("$$  __$$\\ $$  __$$\\ $$$\\    $$$ |$$  __$$\\ \\____$$  |$$  __$$\\ $$$\\  $$ |");
  console.log("$$ |  $$ |$$ /  $$ |$$$$\\  $$$$ |$$ /  $$ |    $$  / $$ /  $$ |$$$$\\ $$ |");
  console.log("$$$$$$$\\ |$$$$$$$$ |$$\\$$\\$$ $$ |$$$$$$$$ |   $$  /  $$ |  $$ |$$ $$\\$$ |");
  console.log("$$  __$$\\ $$  __$$ |$$ \\$$$  $$ |$$  __$$ |  $$  /   $$ |  $$ |$$ \\$$$$ |");
  console.log("$$ |  $$ |$$ |  $$ |$$ |\\$  /$$ |$$ |  $$ | $$  /    $$ |  $$ |$$ |\\$$$ |");
  console.log("$$$$$$$  |$$ |  $$ |$$ | \\_/ $$ |$$ |  $$ |$$$$$$$$\\  $$$$$$  |$$ | \\$$ |");
  console.log("\\_______/ \\__|  \\__|\\__|     \\__|\\__|  \\__|\\________| \\______/ \\__|  \\__|");
  console.log("\n\n******************************************************************\n\n")
  console.log("Connecting to server...")
  connection.connect(function (err) {
    if (err) { errorMsg(err); }
    console.log("Connection successful!")
    start();
  });
}

function loadInventory() {
  connection.query("SELECT * FROM inventory", function (err, res) {
    if (err) { errorMsg(err); }
    for (var i = 0; i < res.length; i++) {
      inventoryArr.push(res[i].product_name);
    }
    userInput(res);
  });
}

function userInput(res) {
  inquirer.prompt([
    {
      name: "inv_pick",
      type: "list",
      choices: inventoryArr,
      message: "Which item would you like to buy?"
    },
    {
      name: "qty_pick",
      message: "How many?",
      type: "input"
    }
  ]).then(answers => {
    //match inquirer choice to db entry
    for (var i = 0; i < res.length; i++) {
      if (res[i].product_name === answers.inv_pick) {
        pick = res[i];
      }
    }
    checkStock(answers);
  });
}

function checkStock(answers) {
  //check stock levels
  if (pick.stock_qty >= parseInt(answers.qty_pick)) {
    //confirm purchase
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'purchaseConfirm',
        message: 'Purchase of ' + answers.inv_pick + ' x ' + answers.qty_pick + ' = $' + (answers.qty_pick * pick.retail_price) + ' ------- Are you sure?'
      }
    ]).then(function (confirm) {
      if (confirm.purchaseConfirm) {
        var newQty = (pick.stock_qty - answers.qty_pick)
        connection.query(
          "UPDATE inventory SET ? WHERE ?",
          [
            {
              stock_qty: newQty
            },
            {
              item_id: pick.item_id
            }
          ],
          function (err) {
            if (err) { errorMsg(err); }
            console.log("Item purchased! Returning to main screen...");
            start();
          }
        )
      }
      else {
        console.log("Order cancelled. Returning to main screen...");
        start();
      }
    });
  }
  else {
    console.log("Sorry! That item is sold out. Returning to main screen...");
    start();
  }
}

function start() {
  console.log("Loading inventory...")
  loadInventory();
}

welcome();