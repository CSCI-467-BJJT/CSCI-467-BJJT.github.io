//createDB.js
//creates the order db

var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./order.db');
createTables(db);

//creates all of the tables for the order database will need to be extended later
function createTables(newdb) {
    newdb.serialize(() => {
        newdb.run('CREATE TABLE CustomerOrder (orderId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, customerId VARCHAR(30) NOT NULL, orderDate VARCHAR(30) NOT NULL,' +
                                               'shipAddr VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL, creditCardNumber VARCHAR(16) NOT NULL,' +
                                               'creditCardExpDate VARCHAR(30) NOT NULL, status VARCHAR(20) NOT NULL, shippingAmount DECIMAL(12,2) NOT NULL,' +
                                               'totalAmount DECIMAL(12,2) NOT NULL)');


        newdb.run('CREATE TABLE OrderItem (orderId INTEGER, partNumber INTEGER, quantity INTEGER, PRIMARY KEY (orderId, partNumber), FOREIGN KEY (orderId) REFERENCES CustomerOrder(orderId))');

        newdb.run('CREATE TABLE WeightBracket (lowerWeight INTEGER PRIMARY KEY, upperWeight INTEGER, amount INTEGER)');
        newdb.run('CREATE TABLE PackingList (packingListId INTEGER PRIMARY KEY AUTOINCREMENT, orderId INTEGER, packingDate DATE, FOREIGN KEY (orderId) REFERENCES CustomerOrder(orderId))');

        newdb.run('CREATE TABLE ShippedOrders(orderId INTEGER PRIMARY KEY, shippingDate DATE, shipperId INTEGER, shippingLable VARCHAR(255), FOREIGN KEY(orderId) REFERENCES CustomerOrder(orderId))');
        newdb.run('CREATE TABLE ReceivedProduct(receivedProductId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, quantityReceived INTEGER)');
        newdb.run('CREATE TABLE ShippingCharge (bracketId INTEGER PRIMARY KEY AUTOINCREMENT, weightBracket INTEGER, charge DECIMAL(12,2))');
        newdb.run('CREATE TABLE EmpLogin (userName VARCHAR(10), passWord TEXT NOT NULL)');
});

}