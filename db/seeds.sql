INSERT INTO department (name, manager_first, manager_last)
VALUES ("Sales", "Morgan", "Riley")
       , ("Engineering", "Zac", "Goad")
       , ("Finance", "Abraham", "Hong")
       , ("Legal", "Josh", "Watkins");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1)
       , ("Salesperson", 80000, 1)
       , ("Lead Engineer", 150000, 2)
       , ("Software Engineer", 120000, 2)
       , ("Account Manager", 160000, 3)
       , ("Accountant", 125000, 3)
       , ("Legal Team Lead", 250000, 4)
       , ("Lawyer", 190000, 4);


INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Zac", "Goad", 3, 2)
       , ("Patrick", "Sutcliffe", 4, 2)
       , ("Josh", "Watkins", 7, 4)
       , ("Bradley", "Kimbrell", 8, 4)
       , ("Morgan", "Riley", 1, 1)
       , ("Rachel", "Cianfichi", 2, 1)
       , ("Abraham", "Hong", 5, 3)
       , ("Jing", "Wang", 6, 3);