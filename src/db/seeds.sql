INSERT INTO department (name)
VALUES ('Sales'),
       ('Customer Service'),
       ('Accounting'),
       ('Marketing'),
       ('Legal');

INSERT INTO  role (title, salary, department_id)
VALUES ('Salesman', 85000, 1),
       ('Customer Service Manager', 90000, 2),
       ('Accountant', 87000, 3),
       ('Marketer', 83000, 4),
       ('lawyer', 98000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ron', 'Swonson', 2, NULL),
       ('Leslie', 'Knope', 1, NULL),
       ('Ben', 'Wyatt', 3, 1),
       ('Andy', 'Dwyer', 4, 1),
       ('April', 'Ludgate', 5, 3);