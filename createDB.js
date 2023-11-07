//createDB.js
//creates the order db

var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./order.db');
createTables(db);
runQueries(db);

//creates all of the tables for the order database will need to be extended later
function createTables(newdb) {
    newdb.serialize(() => {
        newdb.run('CREATE TABLE CustomerOrder (orderId INTEGER PRIMARY KEY, customerId INTEGER)');
        newdb.run('CREATE TABLE OrderItem (partId INTEGER PRIMARY KEY)');
});

}

//this is used to run queries on the customerorder table
//keeping it here for now but will probably not be needed
//as the purpose of this files is to just create the tables in the order database
function runQueries(newdb) {
    newdb.each('SELECT orderId, customerId FROM CustomerOrder', (err, row) => {
        console.log(`${row.orderId}: ${row.customerId}`)
    })
}
