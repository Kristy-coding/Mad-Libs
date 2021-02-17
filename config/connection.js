// THIS FOLDER IS USENG SEQUELIZE TO CONNECT TO THE DATABASE IN MYSQL 
// WE THEN EXPORT IT SO WE CAN REQUIRE IT IN OUR EXPRESS SERVER 
//Dependencies...........................................
// import the Sequelize constructor from the library 
const Sequelize = require('sequelize');


// create connection to our database, pass in your MYSQL information for username and password

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
    console.log('connecting on heroku')
} else {


     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW,{
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });

    console.log('connecting locally')
}

module.exports = sequelize;