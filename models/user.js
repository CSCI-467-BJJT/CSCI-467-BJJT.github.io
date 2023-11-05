const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('csci467', 'student', 'student', {
    host: 'blitz.cs.niu.edu',
    dialect: 'mariadb'
  });

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
   catch (error) {
    console.error('Unable to connect to the database:', error);
}

const part = await parts.findAll();
console.log(part.every(parts => parts instanceof parts)); // true
console.log("All parts:", JSON.stringify(users, null, 2));

sequelize.close()