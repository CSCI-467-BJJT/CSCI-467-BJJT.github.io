//document.body.innerHTML = '<h1> Please work </h1>';

const express = require('express');
const mysql = require('mysql');
 
const app = express();
const PORT = 3000;
 
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

    connection.query("SELECT * FROM parts",  function (err, result, fields) {
        if (err) throw err;
        console.log(result); 
    });
     
    //If Everything goes correct, Then start Express Server
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready and "
             + "Server is Listening on Port ", PORT);
    })
});