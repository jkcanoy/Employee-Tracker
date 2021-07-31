const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { title } = require("process");

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
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
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
          startApp();
        }
      );
    });
};
// Update Employee role
const updateEmployees = () => {
  connection.query(
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            type: "list",
            message: "Select employee to be updated",
            name: "employee",
            choices: function () {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
          },
          {
            type: "list",
            message: "Select employee's new title",
            name: "role",
            choices: selectRole(),
          },
        ])
        .then(function (value) {
          let roleId = selectRole().indexOf(value.role) + 1;
          connection.query("UPDATE employee SET WHERE ?"),
            {
              employee: value.employee,
            },
            {
              role: roleId,
            },
            function (err) {
              if (err) throw err;
              console.table(value);
              startApp();
            };
        });
    }
  );
};
// Add Role
addRole = () => {
  connection.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter the new role",
            name: "roleTitle",
          },
          {
            type: "input",
            message: "Enter the estimated salary",
            name: "roleSalary",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.roleTitle,
              salary: res.roleSalary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              startApp();
            }
          );
        });
    }
  );
};
// Add Department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the new department",
        name: "newDepartment",
      },
    ])
    .then(function (res) {
      var query = connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.newDepartment,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startApp();
        }
      );
    });
}
