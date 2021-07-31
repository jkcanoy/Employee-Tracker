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
// Start function, initial prompt
const startApp = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
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
          viewEmployees();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Update Employee":
          updateEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;
      }
    });
};
// View all Employees
const viewEmployees = () => {
  // query to view all employees
  connection.query(
    "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC",
    function (err, res) {
      if (err) throw err;
      //   display in table
      console.table(res);
      //   return to application start
      startApp();
    }
  );
};
// View all Roles
const viewRoles = () => {
  // query to view all roles
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      //   display in table
      console.table(res);
      //   return to application start
      startApp();
    }
  );
};
// View All Departments
const viewDepartments = () => {
  // query to view all departments
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
      if (err) throw err;
      //   display in table
      console.table(res);
      //   return to application start
      startApp();
    }
  );
};
//  Select role function to call when adding employee
let roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}
// Select manager function to call when adding employee
let managerArr = [];
function selectManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managerArr.push(res[i].first_name);
      }
    }
  );
  return managerArr;
}
// Select employee function to call when updating employee
let employeeArr = [];
function selectEmployee() {
  connection.query(
    "SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managerArr.push(res[i].first_name);
      }
    }
  );
  return managerArr;
}
// Add Employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee's first name",
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter employee's last name",
        name: "lastName",
      },
      {
        type: "list",
        message: "Select employee's role",
        name: "role",
        choices: selectRole(),
      },
      {
        type: "list",
        message: "Select employee's manager",
        name: "manager",
        choices: selectManager(),
      },
    ])
    .then(function (value) {
      let roleId = selectRole().indexOf(value.role) + 1;
      let managerId = selectManager().indexOf(value.manager) + 1;
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          startPrompt();
        }
      );
    });
};
// Update Employee role

// Add Role

// Add Department
