//connect.js
//connects to legacy db
const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;


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