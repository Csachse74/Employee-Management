const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'MySQLPassword',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
// const department = require('./db/departmentQuery.sql');
// const role = require('./db/roleQuery.sql');
const start = [
    {
        type: "list"
        , message: "What would you like to do?"
        , name: "Add"
        , choices: [
            "View All Employees"
            , "Add Employee"
            , "Update Employee Role"
            , "View All Roles"
            , "Add Role"
            , "Update Role Salary"
            , "View All Departments"
            , "Add Department"
            , "Update Department Manager"
            , "Quit"
        ]
    }
];

function init() {
    inquirer.prompt(start).then((choices) => {
        if(choices.Add === "View All Employees") {
            viewAllEmployees();
        } else if (choices.Add === "Add Employee") {
            addEmployee();
        } else if (choices.Add === "Update Employee Role") {
            updateRole();
        } else if (choices.Add === "View All Roles") {
            viewAllRoles();
        } else if (choices.Add === "Add Role") {
            addRole();
        } else if (choices.Add === "Update Role Salary") {
            updateRoleSalary();
        } else if (choices.Add === "View All Departments") {
            viewAllDepartments();
        } else if (choices.Add === "Add Department") {
            addDepartment();
        } else if (choices.Add === "Update Department Manager") {
            updateDepartment();
        } else if (choices.Add === "Quit") {
            process.exit;
        }
    })
};
async function addRole() {
    db.query(`SELECT * FROM department
        ORDER BY id ASC;`
        , function (err, results) {
            if (err) throw err;
            const departments = results.map(element => {
                return element.name
            })
            const ids = results.map(element => {
                return element.id
            })
            inquirer.prompt([
                {
                    type: "input"
                    , message: "What is the name of the role?"
                    , name: "role"
                }
                , {
                    type: "input"
                    , message: "What is the salary of the role?"
                    , name: "salary"
                }
                , {
                    type: "list"
                    , message: "What is the department id?"
                    , name: "department"
                    , choices: departments
                }
            ]).then((choices) => {
                const idNum = departments.findIndex((departments) => departments === choices.department)
                const department_id = ids[idNum]
                db.query(`INSERT INTO employee_role (title, salary, department_id)
                    VALUES ('${choices.role}', '${choices.salary}', '${department_id}');`
                    , function (err, results) {
                    console.log(`Added ${choices.role} to the database`);
                    setTimeout(() => init(), 2000)
                });
            })
    });
    
}
async function updateRoleSalary() {
    db.query(`SELECT id, title FROM employee_role
        ORDER BY id ASC;`
        , function (err, results) {
            if (err) throw err;
            const roles = results.map(element => {
                return element.title
            })
            const ids = results.map(element => {
                return element.id
            })
            
            inquirer.prompt([
                {
                    type: "list"
                    , message: "What is the employee's new role?"
                    , name: "role"
                    , choices: roles
                }
                , {
                    type: "input"
                    , message: "What is the new salary of the role?"
                    , name: "salary"
                }
            ]).then((choices) => {
                const idNum = roles.findIndex((roles) => roles === choices.role)
                const role_id = ids[idNum]
                db.query(`UPDATE employee_role 
                    SET salary = ${choices.salary}
                    WHERE id = ${role_id};`
                    , function (err, results) {
                        console.log(`Updated ${choices.role}'s salary in the database`);
                        setTimeout(() => init(), 2000)
                });
            })
    });
}
async function chooseRole(employee_id, employee) {
    db.query(`SELECT id, title, department_id FROM employee_role
        ORDER BY id ASC;`
        , function (err, results) {
            if (err) throw err;
            const roles = results.map(element => {
                return element.title
            })
            const departments = results.map(element => {
                return element.department_id
            })
            const ids = results.map(element => {
                return element.id
            })
            
            inquirer.prompt([
                {
                    type: "list"
                    , message: "What is the employee's new role?"
                    , name: "role"
                    , choices: roles
                }
            ]).then((choices) => {
                const idNum = roles.findIndex((roles) => roles === choices.role)
                const role_id = ids[idNum]
                const department_id = departments[idNum]
                db.query(`UPDATE employee 
                    SET role_id = ${role_id}, department_id = ${department_id}
                    WHERE id = ${employee_id};`
                    , function (err, results) {
                        console.log(`Updated ${employee}'s role in the database`);
                        setTimeout(() => init(), 2000)
                });
            })
    });
}
async function updateRole() {
    db.query(`SELECT id
        , concat(first_name, ' ', last_name) as employee 
        FROM employee
        ORDER BY id ASC;`
        , function (err, results) {
            if (err) throw err;
            const employees = results.map(element => {
                return element.employee
            })
            const ids = results.map(element => {
                return element.id
            })
            
            inquirer.prompt([
                {
                    type: "list"
                    , message: "Who is the employee you would like to update?"
                    , name: "employee"
                    , choices: employees
                }
            ]).then((choices) => {
                const idNum = employees.findIndex((employees) => employees === choices.employee)
                const employee_id = ids[idNum]
                chooseRole(employee_id, choices.employee);
            })
        }
    );
}
async function addEmployee() {
    db.query(`SELECT * FROM employee_role
        ORDER BY id ASC;`
        , function (err, results) {
            if (err) throw err;
            const tempRole = results.map(element => {
                return element.title
            });
            const tempRoleIds = results.map(element => {
                return element.id
            });
            const tempDepartmentIds = results.map(element => {
                return element.department_id
            });
            
            inquirer.prompt([
                {
                    type: "input"
                    , message: "What is the employee's first name?"
                    , name: "first"
                }
                , {
                    type: "input"
                    , message: "What is the employee's last name?"
                    , name: "last"
                }
                , {
                    type: "list"
                    , message: "What is the employee's role?"
                    , name: "role"
                    , choices: tempRole
                }
                // , {
                //     type: "list"
                //     , message: "Who is the employee's manager?"
                //     , name: "manager"
                //     , choices: managers
                // }
            ]).then((choices) => {
                const roleIdNum = tempRole.findIndex((tempRole) => tempRole === choices.role)
                const role_id = tempRoleIds[roleIdNum]
                const department_id = tempDepartmentIds[roleIdNum]
                // console.log(role_id);
                // console.log(department_id);
                db.query(`INSERT INTO employee (first_name, last_name, role_id, department_id)
                    VALUES ('${choices.first}', '${choices.last}', '${role_id}', '${department_id}');`
                    , function (err, results) {
                        console.log(`Added ${choices.first} ${choices.last} to the database`);
                        setTimeout(() => init(), 2000)
                });
            })
    });
    
}
async function addDepartment() {
    db.query(`SELECT first_name
        , last_name
        , concat(first_name, ' ', last_name) as managers
        FROM employee
        ORDER BY id ASC;`
        , function (err, results) {
            if (err) throw err;
            const managers = results.map(element => {
                return element.managers
            })
            const first = results.map(element => {
                return element.first_name
            })
            const last = results.map(element => {
                return element.last_name
            })
            
            inquirer.prompt([
                {
                    type: "input"
                    , message: "What is the name of the department?"
                    , name: "department"
                }
                , {
                    type: "list"
                    , message: "Who is the department's manager?"
                    , name: "manager"
                    , choices: managers
                }
            ]).then((choices) => {
                const idNum = managers.findIndex((managers) => managers === choices.manager)
                const lastName = last[idNum]
                const firstName = first[idNum]
                db.query(`INSERT INTO department (name, manager_first, manager_last)
                    VALUES ('${choices.department}', '${firstName}', '${lastName}');`
                    , function (err, results) {
                    console.log(`Added ${choices.department} to the database`);
                    setTimeout(() => init(), 2000)
                });
            })
    });
}
async function updateDepartmentManager(department, id) {
    db.query(`SELECT first_name
        , last_name
        , concat(first_name, ' ', last_name) as managers
        FROM employee
        ORDER BY id ASC;`
        , function (err, results) {
            if (err) throw err;
            const managers = results.map(element => {
                return element.managers
            })
            const first = results.map(element => {
                return element.first_name
            })
            const last = results.map(element => {
                return element.last_name
            })
            
            inquirer.prompt([
                {
                    type: "list"
                    , message: "Who is the department's new manager?"
                    , name: "manager"
                    , choices: managers
                }
            ]).then((choices) => {
                const idNum = managers.findIndex((managers) => managers === choices.manager)
                const lastName = last[idNum]
                const firstName = first[idNum]
                db.query(`UPDATE department 
                    SET manager_first = '${firstName}', manager_last = '${lastName}'
                    WHERE id = ${id};`
                    , function (err, results) {
                    console.log(`Updated the manager of ${department} in the database`);
                    setTimeout(() => init(), 2000)
                });
            })
    });
}
async function updateDepartment() {
    db.query(`SELECT id
        , name
        FROM department
        ORDER BY id ASC;`
        , function (err, results) {
            if (err) throw err;
            const departments = results.map(element => {
                return element.name
            })
            const ids = results.map(element => {
                return element.id
            })
            
            inquirer.prompt([
                {
                    type: "list"
                    , message: "What department would you like to update the manager?"
                    , name: "department"
                    , choices: departments
                }
            ]).then((choices) => {
                const idNum = departments.findIndex((departments) => departments === choices.department)
                const id = ids[idNum]
                updateDepartmentManager(choices.department, id)
            })
    });
}
async function viewAllEmployees() {
    db.query(`SELECT employ.id
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
        ORDER BY id ASC;`, function (err, results) {
        console.table(results);
    });
    setTimeout(() => init(), 2000)
}
async function viewAllRoles() {
    db.query(`SELECT role.id
            , role.title as title
            , depart.name as department
            , role.salary
        FROM employee_role role
        INNER JOIN department depart 
        ON role.department_id = depart.id
        ORDER BY id ASC;`, function (err, results) {
        console.table(results);
    });
    setTimeout(() => init(), 2000)
}
async function viewAllDepartments() {
    db.query(`SELECT depart.id
            , depart.name as Department
            , concat(depart.manager_first, ' ', depart.manager_last) as Manager
        FROM department depart
        ORDER BY id ASC;`, function (err, results) {
        console.table(results);
    });
    setTimeout(() => init(), 2000)
}

init();