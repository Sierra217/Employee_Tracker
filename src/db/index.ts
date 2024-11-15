import { pool } from "./connection.js";
import { QueryResult } from 'pg';

export default class DB {
    constructor() { }

    async query(sql: string, args: any[] = []): Promise<QueryResult> {
        const client = await pool.connect()

        try {
            return client.query(sql, args);
        } finally {
            client.release();
        }
    }

    //view all departments
    viewDepartments() {
        return this.query(
            'SELECT id, name FROM department'
        );
    }
    //view all roles
    viewRoles() {
        return this.query(
            'SELECT id, title, salary, department_id FROM role'
        );
    }
    //view all employees
    viewEmployees() {
        return this.query(
            'SELECT id, first_name, last_name, role_id, manager_id FROM employee'
        );
    }
    //add a department
    addDepartment(name: string) {
        return this.query(
            'INSERT INTO department(name) VALUES ($1)',
            [name]
        );
    }
    //add a role
    addRole(title: string, salary: number, department_id: number) {
        return this.query(
            'INSERT INTO role (title, salary, department_Id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        );
    }
    //add an employee
    addEmployee(first_name: string, last_name: string, role_id: number, manager_id: number) {
        return this.query(
            'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, role_id, manager_id]
        );
    }
    //update an employee role
    updateRole(roleId: number, title: string, salary: number, department_id: number) {
        return this.query(
            'UPDATE role SET id = $1, title = $2, salary =$3, department_id = $4',
            [roleId, title, salary, department_id]
        );   
    }
}