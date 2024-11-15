import inquirer from "inquirer";
import Db from "./db/index.js";
const db = new Db();
async function startApplication() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: ('Select an action'),
            choices: [
                'View all departments',
                'View all roles',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);
    switch (action) {
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            updateRole();
            break;
        case 'Exit':
            quit();
    }
}
function viewDepartments() {
    db.viewDepartments()
        .then(({ rows }) => {
        const department = rows;
        console.log('\n');
        console.table(department);
    })
        .then(() => startApplication());
}
function viewRoles() {
    db.viewRoles()
        .then(({ rows }) => {
        const role = rows;
        console.log('\n');
        console.table(role);
    })
        .then(() => startApplication());
}
function addDepartment() {
    inquirer.prompt([
        {
            name: 'departmentName',
            message: 'Name the department you would like to add',
            type: 'input'
        }
    ])
        .then(resp => {
        db.addDepartment(resp.departmentName)
            .then(() => {
            console.log('Department added!');
            startApplication();
        });
    });
}
function addRole() {
    inquirer.prompt([
        {
            name: 'roleTitle',
            message: 'Name the role you would like to add',
            type: 'input'
        },
        {
            name: 'roleSalary',
            message: 'Enter the salary for this role',
            type: 'input'
        },
        {
            name: 'roleDepartmentId',
            message: 'What is the roles department id?',
            type: 'input'
        }
    ])
        .then(resp => {
        db.addRole(resp.roleTitle, resp.roleSalary, resp.roleDepartmentId)
            .then(() => {
            console.log('Role added!');
            startApplication();
        });
    });
}
function addEmployee() {
    inquirer.prompt([
        {
            name: 'fName',
            message: 'What is the new employees first name?',
            type: 'input'
        },
        {
            name: 'lName',
            message: 'What is the new employees last name?',
            type: 'input'
        },
        {
            name: 'roleId',
            message: 'What is the roles id?',
            type: 'input'
        },
        {
            name: 'managerId',
            message: 'What is the id for the employees manager?',
            type: 'input'
        }
    ])
        .then(resp => {
        db.addEmployee(resp.fName, resp.lName, resp.roleId, resp.managerId)
            .then(() => {
            console.log('Employee added!');
            startApplication();
        });
    });
}
async function updateRole() {
    const queryResp = await db.viewRoles();
    console.table(queryResp.rows);
    const choicesArr = queryResp.rows.map(role => ({
        name: role.title,
        value: role.id
    }));
    inquirer.prompt([
        {
            name: 'roleId',
            message: 'which role id would you like to update?',
            type: 'list',
            choices: choicesArr
        },
        {
            name: 'roleTitle',
            message: 'Update the role title',
            type: 'input'
        },
        {
            name: 'roleSalary',
            message: 'Update the role salary',
            type: 'input'
        },
        {
            name: 'roleDepartmentId',
            message: 'Update the department id for this role',
            type: 'input'
        }
    ])
        .then(async (resp) => {
        const updResp = await db.updateRole(resp.roleId, resp.roleTitle, resp.roleSalary, resp.roleDepartmentId);
        console.log(`${updResp} role updated!`);
        startApplication();
    });
}
function quit() {
    console.log('Goodbye');
    process.exit();
}
startApplication();
