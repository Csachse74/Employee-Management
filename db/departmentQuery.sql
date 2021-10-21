SELECT depart.id
        , depart.name as Department
        , concat(depart.manager_first, ' ', depart.manager_last) as Manager
FROM department depart
ORDER BY id ASC

-- INSERT INTO department (name)
-- VALUES ('service');