//connect.js
//connects to legacy db and is able to take values from it and enter them into the self created order db


const express = require('express');
const mysql = require('mysql');
const sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
 
const app = express();
const PORT = 3000;

const parts = [];             //holds part ids

//-------------------------------------------------------------------------------

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'blitz.cs.niu.edu',
  user: 'student',
  password: 'student',
  database: "csci467"       
});
 
// open the MySQL connection
connection.connect(error => {
    if (error){
        console.log("A error has been occurred "
            + "while connecting to database.");        
        throw error;
    }

    //get all numbers from parts
    connection.query("SELECT number FROM parts",  function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            parts[i] = row.number;                    //put into parts array
        }

  //      print(parts);
        console.log("job complete, exit database connection");
        connection.end();                             //close connection
        insertOrder(parts, orderdb);

    });

    //If Everything goes correct, Then start Express Server
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready and "
             + "Server is Listening on Port ", PORT);
    })
});

//-----------------------------------------------------------------------------------
//order db connection
var dbpath = './order.db';
var dbExists = fs.existsSync(dbpath);
if (!dbExists) {
    fs.openSync(dbpath, 'w');
}

//connect to order db
var orderdb = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE,  (err) => {
    if (err) {
        return console.error(err.message);
    }

    console.log("successfuly connected to order database");
    });

//BEGGINGING OF FUNCTIONS---------------------------------------------------------------------------------------------------------------

//prints the parts array
function print(parts) {
    for (var i = 0; i < parts.length; i++) {
        console.log(parts[i] + "print");
    }
}


//takes all of the parts array and inserts them into the order db
function insertOrder(parts, db) {

 //   const ins = db.prepare('INSERT INTO OrderItem (partId) VALUES (?)');

    for (var i = 0; i < parts.length; i++) {
        db.run('INSERT INTO CustomerOrder (orderId, customerId, orderDate, shipAddr, email, creditCardNumber, creditCardExpDate, status, shippingAmount, totalAmount)' +
                                          'VALUES (?, 1, 1000,"address", "email", 662346234, 2000, "status", 10.00, 20.00)', function(err) {     //insert part id
            if (err) {
              return console.log(err.message);
            }
        });
    }

    runQueries(db);
}

//function to run queries on the order db
function runQueries(db) {
    db.each('SELECT * FROM CustomerOrder', (err, row) => {
        console.log(`${row.orderId} ${row.customerId} ${row.orderDate} ${row.shipAddr} ${row.email} ${row.creditCardNumber} ${row.creditCardExpDate} ${row.status} ${row.shippingAmount} ${row.totalAmount}`);
    })
}