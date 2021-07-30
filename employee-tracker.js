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
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All Employees",
          "View All Employees By Role",
          "View All Employees By Deparment",
          "Update Employee",
          "Add Employee",
          "Add Role",
          "Add Department",
        ],
      },
    ])
    .then(function (value) {
      switch (value.action) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Employees By Role":
          viewRoles();
          break;

        case "View All Employees By Department":
          viewDepartments();
          break;

        case "Update Employee":
          updateEmployees();
          break;

        case "Add Employee":
          addEmployees();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addRole();
          break;
      }
    });
};
