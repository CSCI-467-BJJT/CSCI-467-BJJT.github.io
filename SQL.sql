-- Just in cased it existed, it doesn't now
DROP TABLE ProductInventory;
DROP TABLE CustomerOrder;
DROP TABLE OrderItem;
DROP TABLE PackingList;
DROP TABLE ShippedOrders;
DROP TABLE ReceivedProduct;
DROP TABLE ShippingCharge;


--
CREATE TABLE CustomerOrder (
	orderId INT PRIMARY KEY AUTO_INCREMENT -- AUTO INCREMTN FOR EACH NEW ORDER
	customerId INT, -- Unique identifier for customers
	orderDate DATE,
	status VARCHAR(20), --Current Status for the order like pending, shipped, etc.
	totalAmount DECIMAL(12,2), -- Total Amount for orders
	shippingAmount DECIMAL(12,2), -- Shipping charge added to the order
	creditCardNumber VARCHAR(16),
	creditCardExpDate DATE,
	PRIMARY KEY (orderID)
);


CREATE TABLE OrderItem (
	orderId INT,
	partNumber INT,
	quantity INT,
	PRIMARY KEY (orderId, partNumber), --Allows each order item unique
	FOREIGN KEY (orderId) REFERENCES CustomerOrder(orderId),
	FOREIGN KEY (partNumber) REFERENCES ProductInventory(partNumber)
);


-- WAREHOUSE SECTION

CREATE TABLE PackingList (
	packingListId INT PRIMARY KEY AUTO-INCREMENT, --Uniquely identifies each packing list
	orderId INT,
	workedId INT,
	packingDate DATE,
	PRIMARY KEY (packingListId),
	FOREIGN KEY (orderId) REFERENCES CustomerOrder(orderId)
);


CREATE TABLE ShippedOrders (
    orderId INT PRIMARY KEY,
    shippingDate DATE,
    shipperId INT, --WorkerID
    shippingLable VARCHAR(255),
    PRIMARY KEY (orderId),
    FOREIGN KEY(orderId) REFERENCES CustomerOrder(orderId)
);

--Receiving Interface
CREATE TABLE ReceivedProduct(
    receivedProductId INT PRIMARY KEY AUTO_INCREMENT,
    partNumber INT,
    receivedDate DATE,
    quantityReceived INT,
    PRIMARY KEY (receivedProductId),
    FOREIGN KEY (partNumber) REFERENCES LegacyProduct(partNumber)
);

CREATE TABLE ShippingCharge(
    bracketId INT PRIMARY KEY AUTO-INCREMENT,
    weightBracket INT,
    charge DECIMAL(12,2),
    PRIMARY KEY (bracketId)
);