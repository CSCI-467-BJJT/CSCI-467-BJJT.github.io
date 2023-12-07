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
var nodemailer = require('nodemailer');

var port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let cart = [];
var orderCount = 1;

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

//This method takes all of the orders from the customers order table in the order db and returns them in an array
app.get('/api/adminOC', (req, res) => {
    
    order = [];
    
    //PUSH ROWS INTO ARRAY
    let sql1 = `SELECT * FROM CustomerOrder`;
    
    orderdb.all(sql1, [], (err, rows) => {
        if (err) {
          throw err;
        }
       
      });

      for(var i = 0; i < rows.length; i++){
        order.push({
            orderId: rows[i].orderId,
            customerId: rows[i].customerId,
            orderDate: rows[i].orderDate,
            shipAddr: rows[i].shipAddr,
            email: rows[i].email,
            creditCardNumber: rows[i].creditCardNumber,
            creditCardExpDate: rows[i].creditCardExpDate,
            status: rows[i].status,
            shippingAmount: rows[i].shippingAmount,
            totalAmount: rows[i].totalAmount
        })
    } res.send(order);

})

app.post('/api/cart', (req, res) => {
    const cartItems = req.body;

    cart = []
    for (var i = 0; i < cartItems.length; i++) {
        cart.push(cartItems[i]);
        //degubTool console.log(cartItems[i].description, cartItems[i].partNum, cartItems[i].price);

    }

    res.json({ message: 'Data received successfully'});
});

app.post('/api/quantity', (req, res) => {
    const cartItems = req.body;

    cart = []
    for (var i = 0; i < cartItems.length; i++) {
        cart.push(cartItems[i]);
    }
    res.json({ message: 'Data received successfully'});
});

app.get('/api/obtainCart', (req, res) => {
    res.send(cart);
});

app.get('/api/collect', async (req, res) => {
    const partArray = [];
    try {
        const data = await fetchall();
        
        for (let i = 0; i < data.length; i++) {
            
        //    console.log('Current data:', data[i].description);

            partArray.push({
                name: data[i].description,
                img: data[i].pictureURL,
                price: data[i].price,
                partNum: data[i].number
            });

           // console.log(partArray[i]);
        }



        res.send(partArray);

    } catch (error) {
        throw error;
    }
});

app.post('/api/processOrder', async (req, res) => {
    try{
        
        // Extract request parameters
       // const { creditCardNumber, customerId, email, shipAddr, month, year} = req.query;

       const values = req.body;

       creditCardNumber = values[0];
       customerId = values[1];
       email = values[2];
       shipAddr = values[3];
       month = values[4];
       year = values[5];

       total = 0;

       for (var i = 0; i < cart.length; i++) {
            total += (cart[i].price * cart[i].quantity);
       }
       total = total.toFixed(2);
       
        let numstr = creditCardNumber.toString();
        let CCLength = numstr.length;

        //Checks to see if credit card number is the min 16
        if(CCLength !== 16){
            return res.send('INVALID CREDIT CARD NUMBER');
            //kill = true;
        }

        var currentDate = month;
        currentDate += `/`;
        currentDate += year;

        console.log(shipAddr, email, numstr, customerId, currentDate, total);
        addOrderNum(customerId, currentDate, shipAddr, email, numstr, currentDate, total);

        //The JS version of the Php code provided with some changends
        const url = 'http://blitz.cs.niu.edu/CreditCard/';
 
        const data = {
            vendor: 'VE001-99',
            trans: '907-987654321-296',
            cc: numstr,
            name: customerId,
            exp: currentDate,
            amount: total
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        };

        fetch(url, options)
        .then(response => {
            if(!response.ok) {
                throw new Error (`ERROR: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log('success', result);
            emailToUser(email);
            printCustOrder();

        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        // Handle the response or futher processing needed
        res.send('Order processed sucessfully');
    } catch (error){
        // Logs and sends a generic error message for server errors
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
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


function emailToUser(email) {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        host: 'smtp.gmail.com',
        auth: {
            user: 'wheelygoodparts@gmail.com',
            pass: 'ylpt ihoj jhoi pist'
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mail = {
        from: 'wheelygoodparts@gmail.com',
        to: email,
        subject: 'THANK YOU',
        text: 'Thank you for your order',

    };

    transport.sendMail(mail, function (err, info) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    })
}


function printCustOrder(){

    let sql1 = `SELECT * FROM CustomerOrder`;
    let sql2 = `SELECT * FROM OrderItem`;

    orderdb.all(sql1, [], (err, rows) => {
        if (err) {
          throw err;
        }console.log(rows);
       
      });
      
      orderdb.all(sql2, [], (err, rows) => {
        if (err) {
          throw err;
        }console.log(rows)

      });
}

function addOrderNum(customerId, currentDate, shipAddr, email, numstr, currentDate, total){
    
    const insertOrderPartSQL = 'INSERT INTO CustomerOrder (customerId, orderDate, shipAddr, email, creditCardNumber, creditCardExpDate, status, shippingAmount, totalAmount)' +
        'VALUES (?, ?, ?, ?, ?, ?, "status", 1200.00, ?)';

        //Prepare and excute SQL statement
        /*
        const orderPartStm = newdb.prepare(insertOrderPartSQL);
        const success = orderPartStm.run(customerId, shipAddr, email, formatedCCNUM, `${creditCardExpDate}-1`, total);      
        */
       orderdb.run(insertOrderPartSQL, [customerId, currentDate, shipAddr, email, numstr, currentDate, total], function(err) {     //insert part id
        if (err) {
          return console.log(err.message);
        } orderCount++;
    });

    const insertOrderNumSQL = 'INSERT INTO OrderItem (orderId, partNumber, quantity) VALUES (?, ?, ?)';
    for(var i = 0; i < cart.length; i++){
        orderdb.run(insertOrderNumSQL, [orderCount, cart[i].partNum, cart[i].quantity], function(err) {     //insert part id
            if (err) {
              return console.log(err.message);
            }
        });
        
    }
}