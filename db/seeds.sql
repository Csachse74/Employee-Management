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
       , ("Legal Team Lead", 250000, 4);
       , ("Lawyer", 190000, 4);


INSERT INTO course_names (first_name, last_name, role_id, department_id)
VALUES ("Intro to JavaScript", 1)
       , ("Data Science", 2)
       , ("Linear Algebra", 3)
       , ("History of the Internet", 4)
       , ("Machine Learning", 4)
       , ("Game Design", 1 )
       , ("Cloud Development", 1);