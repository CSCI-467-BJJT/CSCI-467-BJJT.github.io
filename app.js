//app.js
//Connects to connec.js, collects data, and sends to ejs file
const dir = '${__dirname}/';
const path = require('path');
const express = require('express')
var fs = require('fs');
const app = express()
const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql');
const util = require('util');
const cors = require('cors');

var port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let cart = [];

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
});

//grab all part info
module.exports = {
    getAll: async result => {
        connection.query("SELECT * FROM parts",  function (err, rows) {
        if (err) throw err;
        result(rows);
        });
    }
}

const query = util.promisify(connection.query).bind(connection);

const fetchall = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM parts', function (err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

app.get('/api/data', (req, res) => {
    console.log('This prints to the console running in the server when the button is clicked');
});

app.post('/api/cart', (req, res) => {
    const cartItems = req.body;

    cart = []
    for (var i = 0; i < cartItems.length; i++) {
        console.log(cartItems[i]);
        cart.push(cartItems[i]);
    }

    res.json({ message: 'Data received successfully'});
});

app.post('/api/quantity', (req, res) => {
    const cartItems = req.body;

    cart = []
    for (var i = 0; i < cartItems.length; i++) {
        console.log(cartItems[i]);
        cart.push(cartItems[i]);
    }
    res.json({ message: 'Data received successfully'});
});

app.get('/api/obtainCart', (req, res) => {
    res.send(cart);
});

app.get('/api/collect', async (req, res) => {
    console.log('This collects all parts');
    const partArray = [];
    try {
        const data = await fetchall();
        
        for (let i = 0; i < data.length; i++) {
            
        //    console.log('Current data:', data[i].description);

            partArray.push({
                name: data[i].description,
                img: data[i].pictureURL,
                price: data[i].price
            });

           // console.log(partArray[i]);
        }



        res.send(partArray);

    } catch (error) {
        throw error;
    }
});

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