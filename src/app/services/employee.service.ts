//#region IMPORT

import { Injectable } from '@angular/core';
import { ARRAY_EMPLOYEES, initializeDummyData } from '../constants/employee.constant';
import { EmployeeModel } from '../models/employee.model';

//#endregion


//#region INJECTABLE

@Injectable
(
    {
        providedIn: 'root'
    }
)

//#endregion


//#region CLASS

export class EmployeeService
{
    //#region ATTRIBUTES

    private STORAGE_KEY = "employee_list";

    //#endregion


    //#region CONSTRUCTOR 

    constructor()
    {
        this.initStorage();
    }

    //#endregion


    //#region SERVICE

    private initStorage(): void
    {
        const savedData = localStorage.getItem(this.STORAGE_KEY);
        
        if (!ARRAY_EMPLOYEES.length)
        {
            initializeDummyData();
        }
        
        if (!savedData || (savedData && savedData.length < 3))
        {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ARRAY_EMPLOYEES));
        }
    }

    public getAllEmployees(): EmployeeModel[]
    {
        const dataString = localStorage.getItem(this.STORAGE_KEY);
        return dataString ? JSON.parse(dataString) : [];
    }

    public addEmployee(employee: EmployeeModel): void
    {
        const currentList = this.getAllEmployees();
        currentList.unshift(employee);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentList));
    }

    public updateEmployee(index: number, employeeUpdate: EmployeeModel): void
    {
        const currentList = this.getAllEmployees();
        currentList[index] = employeeUpdate;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentList));
    }

    public deleteEmployeeByUsername(username: string): void
    {
        const currentList = this.getAllEmployees();
        const updatedList = currentList.filter(employee => employee.username !== username);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedList));
    }

    //#endregion
}

//#endregion
