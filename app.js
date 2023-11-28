//app.js
//Connects to connec.js, collects data, and sends to ejs file
const dir = '${__dirname}/';
const path = require('path');
const express = require('express')
var fs = require('fs');
const app = express()
const sqlite3 = require('sqlite3').verbose();

var port = process.env.PORT || 3000;

//Compents temp placement
app.use(express.static('/'));

//absolute path name
const options = {
  root: path.join(__dirname)
};

//holds order data
var p = [];


// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

//grab part information from legacy db
const parts = require('./connect');
app.get('/getParts', (req, res) => {
  parts.getAll((list) => {
    res.render('parts.ejs', { all: list });
    for (var i = 0; i < list.length; i++) {
        p[i] = list[i];
    }

    //these two functions will not be here in reality, but this is how I am adding order information into the order db
    insertOrder(p, orderdb);
    print(p);
  });
})

app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`)
  })


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
    insertOrder(p, orderdb);
    print(p);
    });

//inset orders into order db
function insertOrder(part, db) {

    for (var i = 0; i < part.length; i++) {
        db.run('INSERT INTO CustomerOrder (orderId, customerId, orderDate, shipAddr, email, creditCardNumber, creditCardExpDate, status, shippingAmount, totalAmount)' +
                                          'VALUES (?, 1, 1000,"address", "email", 662346234, 2000, "status", 10.00, 20.00)', function(err) {     //insert part id
            if (err) {
              return console.log(err.message);
            }
        });
    }
    return;
 //   runQueries(db);
}
//print the parts array
function print(part) {
    for (var i = 0; i < part.length; i++) {
        console.log(part[i].number + part[i].description + part[i].price + part[i].weight + part[i].pictureURL);
    }
}
