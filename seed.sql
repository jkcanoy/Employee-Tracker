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
("Hermes", "Conrad", 6, NULL),
("John A.", "Zoidberg", 7, NULL),
("Kif", "Kroker", 8, 2),
("Philip J.", "Fry", 2, 5),
("Turanga", "Leela", 1, NULL),
("Cubert", "Farnsworth", 4, 7),
("Hubert J.", "Farnsworth", 3, NULL),
("Bender", "Rodriguez", 2, 5),
("Lord", "Nibbler", 8, 2),
("Amy", "Wong", 5, 1)




