import { Component, OnInit } from '@angular/core';
import { BaseModule } from '../../../modules/bases/base.module';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { TableModel } from '../../../models/table.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [BaseModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit
{
    //#region DECLARATION
    
    public _employeeTable: TableModel;
    public _arrayModelEmployee: Array<EmployeeModel>;
    
    //#endregion


    //#region CONSTRUCTOR

    constructor(private router: Router, private employeeService: EmployeeService)
    {
        this._employeeTable = new TableModel;
        this._arrayModelEmployee = [];
    }

    //#endregion


    //#region INITIALIZATION

    ngOnInit(): void
    {
        this.callGetAllEmployee();
    }

    //#endregion


    //#region FUNCTION

    public onPageChange(newPage: number)
    {
        if (this._employeeTable)
        {
            this._employeeTable.currentPage = newPage;
            this.callGetAllEmployee();
        }
    }

    //#endregion


    //#region SERVICE

    public callGetAllEmployee(): void
    {
        const arrayEmployee = this.employeeService.getAllEmployees();

        const limit = this._employeeTable.pagination || 20;
        const page = this._employeeTable.currentPage || 1;

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        this._arrayModelEmployee = arrayEmployee.slice(startIndex, endIndex);
        this._employeeTable.startData = startIndex + 1;
        this._employeeTable.totalPage = Math.ceil(arrayEmployee.length / limit);
        this._employeeTable.totalData = arrayEmployee.length;
        this._employeeTable.endData = (endIndex > (this._employeeTable.totalData || 0)) ? this._employeeTable.totalData : endIndex;
    }

    //#endregion
}
