var sqlite3 = require('sqlite3').verbose();
const express = require('express')
const app = express()
var port = process.env.PORT || 3000;


var db = new sqlite3.Database('./order.db');
createTables(db);
runQueries(db);


function createTables(newdb) {
    newdb.serialize(() => {
        newdb.run('CREATE TABLE CustomerOrder (orderId INTEGER PRIMARY KEY, customerId INTEGER)');
        newdb.run('CREATE TABLE OrderItem (partId INTEGER PRIMARY KEY)');

    const data = [
        [1, 2]
    ];

    const ins = newdb.prepare('INSERT INTO CustomerOrder (orderId, customerId) VALUES (?, ?)');

    data.forEach((row) => ins.run(row));
    ins.finalize();   
});

}

function runQueries(newdb) {
    newdb.each('SELECT orderId, customerId FROM CustomerOrder', (err, row) => {
        console.log(`${row.orderId}: ${row.customerId}`)
    })
}
