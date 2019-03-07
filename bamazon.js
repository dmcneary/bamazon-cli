var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection(
    {
        host: "localhost",
        port: 3306, 
        user: "root",
        password: "password",
        database: "inventory_db"
    }
);

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
    connection.connect(function(err) {
        if (err) {errorMsg(err);}
        console.log("Connection successful!")
        start();
      });
}

function start() {
    console.log("Loading inventory...")
    connection.query("SELECT * FROM inventory", function (err, res) {
        if (err) {errorMsg(err);}
        inquirer.prompt([
            {
                name: "inv_pick",
                type: "list",
                choices: [function () {
                    var inventoryArr = [];
                    for (var i = 0; i < res.length; i++) {
                        inventoryArr.push(res[i].product_name);
                    }
                    return inventoryArr;
                }, "[EXIT]"],
                message: "Which item would you like to buy?"
            },
            {
                name: "qty_pick",
                message: "How many?",
                type: "input",
            }
        ]).then(answers => {
            //match inquirer choice to db entry
            var pick;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answers.inv_pick) {
                  pick = res[i];
                }
            }
            //check for adequate stock
            if (pick.stock_qty < parseInt(answers.qty_pick)) {
                //confirm purchase
                inquirer.prompt([
                    {
                        type: "confirm",
                        message
                    }
                ])
                var newQty = (pick.stock_qty - answer.qty_pick)
                connection.query(
                  "UPDATE inventory SET ? WHERE ?",
                  [
                    {
                      stock_qty: newQty
                    },
                    {
                      id: pick.id
                    }
                  ],
                  function(err) {
                    if (err) {errorMsg(err);}
                    console.log("Item purchased! Returning to main screen...");
                    start();
                  }
                );
              }
              else {
                // bid wasn't high enough, so apologize and start over
                console.log("Your bid was too low. Try again...");
                start();
              }
        })
    })
}
welcome();