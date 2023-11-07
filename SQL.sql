-- Just in cased it existed, it doesn't now
DROP TABLE IF EXISTS CustomerOrder;
DROP TABLE IF EXISTS OrderItem;
DROP TABLE IF EXISTS PackingList;
DROP TABLE IF EXISTS ShippedOrders;
DROP TABLE IF EXISTS ReceivedProduct;
DROP TABLE IF EXISTS ShippingCharge;
DROP TABLE IF EXISTS EmpLogin;


--Has customer login info included in their order
CREATE TABLE CustomerOrder (
	orderId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- AUTO INCREMTN FOR EACH NEW ORDER
	customerId VARCHAR(30) NOT NULL, -- Names for customers
	orderDate DATE NOT NULL,
	shipAddr VARCHAR(30) NOT NULL,
	email VARCHAR(30) NOT NULL,
	creditCardNumber VARCHAR(16) NOT NULL,
	creditCardExpDate DATE NOT NULL,
	status VARCHAR(20) NOT NULL, --Current Status for the order like pending, shipped, etc.
	shippingAmount DECIMAL(12,2) NOT NULL, -- Shipping charge added to the order
	totalAmount DECIMAL(12,2) NOT NULL, -- Total Amount for orders
);

-- Orders from the customer's
CREATE TABLE OrderItem (
	orderId INT,
	partNumber INT,
	quantity INT,
	PRIMARY KEY (orderId, partNumber), --Allows each order item unique
	FOREIGN KEY (orderId) REFERENCES CustomerOrder(orderId),
);


-- WAREHOUSE SECTION

-- Stores info for packing list
CREATE TABLE PackingList (
	packingListId INT PRIMARY KEY AUTO_INCREMENT, --Uniquely identifies each packing list
	orderId INT,
	packingDate DATE,
	FOREIGN KEY (orderId) REFERENCES CustomerOrder(orderId)
);

-- Orders that have been shipped
CREATE TABLE ShippedOrders (
    orderId INT PRIMARY KEY,
    shippingDate DATE,
    shipperId INT, --WorkerID
    shippingLable VARCHAR(255),
    FOREIGN KEY(orderId) REFERENCES CustomerOrder(orderId)
);

--Receiving Interface
CREATE TABLE ReceivedProduct(
    receivedProductId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    quantityReceived INT,
);

-- For different weight brackets and the shipping charge for them
CREATE TABLE ShippingCharge(
    bracketId INT AUTO_INCREMENT PRIMARY KEY,
    weightBracket INT,
    charge DECIMAL(12,2),    
);

-- Creates the Employee Login
CREATE TABLE EmpLogin (
	userName CHAR(15) PRIMARY key,
	passWord CHAR(10) NOT NULL
)
