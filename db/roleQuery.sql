SELECT role.id
        , role.title as title
        , depart.name as department
        , role.salary
FROM employee_role role
INNER JOIN department depart 
ON role.department_id = depart.id
ORDER BY id ASC;
