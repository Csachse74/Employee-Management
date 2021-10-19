SELECT employ.id
        , employ.first_name
        , employ.last_name
        , role.title as title
        , depart.name as department
        , role.salary
        , manager.first_name as manager
FROM employee employ
JOIN employee manager
ON employ.manager_id = manager.id
INNER JOIN department depart 
ON employ.department_id = depart.id
INNER JOIN employee_role role
ON employ.role_id = role.id;