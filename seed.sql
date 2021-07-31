USE employee_db;

-- department seeds
INSERT INTO department (name) VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");
-- role seeds
INSERT INTO role (title, salary, department_id) VALUES
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Finance Lead", 200000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);
-- employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Winston", "Schmidt", 6, NULL),
("Nick", "Miller", 7, NULL),
("Winston", "Bishop", 8, 2),
("Jessica", "Day", 2, 5),
("Cece", "Parikh", 1, NULL),
("Ernie", "Tagliaboo", 4, 7),
("Reagan", "Lucas", 3, NULL),
("Bear", "Claw", 2, 5),
("Arthur", "Morgan", 8, 2),
("Joel", "Miller", 5, 1)




