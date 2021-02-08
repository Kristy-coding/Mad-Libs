// THIS FOLDER IS USENG SEQUELIZE TO CONNECT TO THE DATABASE IN MYSQL 
// WE THEN EXPORT IT SO WE CAN REQUIRE IT IN OUR EXPRESS SERVER 
//Dependencies...........................................
// import the Sequelize constructor from the library 
const Sequelize = require('sequelize');


// create connection to our database, pass in your MYSQL information for username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW,{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;