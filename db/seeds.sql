INSERT INTO department (name)
VALUES ("Sales")
       , ("Engineering")
       , ("Finance")
       , ("Legal");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1)
       , ("Salesperson", 80000, 1)
       , ("Lead Engineer", 150000, 2)
       , ("Software Engineer", 120000, 2)
       , ("Account Manager", 160000, 3)
       , ("Accountant", 125000, 3)
       , ("Legal Team Lead", 250000, 4)
       , ("Lawyer", 190000, 4);


INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id)
VALUES ("Zac", "Goad", 3, 2, null)
       , ("Patrick", "Sutcliffe", 4, 2, 1)
       , ("Josh", "Watkins", 7, 4, null)
       , ("Bradley", "Kimbrell", 8, 4, 3)
       , ("Morgan", "Riley", 1, 1, null)
       , ("Rachel", "Cianfichi", 2, 1, 5)
       , ("Abraham", "Hong", 5, 3, null)
       , ("Jing", "Wang", 6, 3, 7);