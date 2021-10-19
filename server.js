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
            , "View All Departments"
            , "Add Department"
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
            addEmployee();
        } else if (choices.Add === "View All Roles") {
            viewAllRoles();
        } else if (choices.Add === "Add Role") {
            addRole();
        } else if (choices.Add === "View All Departments") {
            viewAllDepartments();
        } else if (choices.Add === "Add Department") {
            addDepartment();
        }
    })
};
async function addRole() {
    db.query(`SELECT * FROM department
        ORDER BY id ASC;`
        , function (err, results) {
            if (err) throw err;
            console.log(results);
            const departments = results.map(element => {
                return element.name
            })
            const ids = results.map(element => {
                return element.id
            })
            console.log(departments)
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
                console.log(idNum);
                console.log(ids[idNum]);
                db.query(`INSERT INTO employee_role (title, salary, department_id)
                    VALUES ('${choices.role}', '${choices.salary}', '${department_id}');`
                    , function (err, results) {
                    console.log(`Added ${choices.role} to the database`);
                    setTimeout(() => init(), 2000)
                });
            })
    });
    
}
async function addDepartment() {
    inquirer.prompt([
        {
            type: "input"
            , message: "What is the name of the department?"
            , name: "department"
        }
    ]).then((choices) => {
        db.query(`INSERT INTO department (name)
            VALUES ('${choices.department}');`
            , function (err, results) {
            console.log(`Added ${choices.department} to the database`);
            console.log(results);
            setTimeout(() => init(), 2000)
        });
    })
}
async function viewAllEmployees() {
    console.log('took right path');
    db.query(`SELECT employ.id
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
    ON employ.role_id = role.id
    ORDER BY id Asc;`, function (err, results) {
        console.log(results);
    });
    setTimeout(() => init(), 2000)
}
async function viewAllRoles() {
    console.log('took right path');
    db.query(`SELECT role.id
        , role.title as title
        , depart.name as department
        , role.salary
    FROM employee_role role
    INNER JOIN department depart 
    ON role.department_id = depart.id
    ORDER BY id ASC;`, function (err, results) {
        console.log(results);
    });
    setTimeout(() => init(), 2000)
}
async function viewAllDepartments() {
    console.log('took right path');
    db.query(`SELECT depart.id
        , depart.name
    FROM department depart
    ORDER BY id ASC;`, function (err, results) {
        console.log(results);
    });
    setTimeout(() => init(), 2000)
}
// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// db.query('SELECT * FROM course_names', function (err, results) {
//   console.log(results);
// });

app.use((req, res) => {
  res.status(404).end();
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
init();