const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

require("dotenv").config();

// create connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  //   Use dotenv to keep login information safe
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// Establish connection, start app
connection.connect(function (err) {
  if (err) throw err;
  console.log("WELCOME TO THE EMPLOYEE TRACKER");
  startApp();
});
// Start function
const startApp = () => {
  inquirer.prompt([{}]);
};
