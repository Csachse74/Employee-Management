SELECT employ.id
        , concat(employ.first_name, ' ', employ.last_name) as Employee
        , role.title as Title
        , depart.name as Department
        , role.salary as Salary
        , concat(depart.manager_first, ' ', depart.manager_last) as Manager
FROM employee employ
INNER JOIN department depart 
ON employ.department_id = depart.id
INNER JOIN employee_role role
ON employ.role_id = role.id
ORDER BY id ASC;