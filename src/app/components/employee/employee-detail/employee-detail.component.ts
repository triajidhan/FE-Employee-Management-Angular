//#region IMPORT

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';
import { BaseModule } from '../../../modules/bases/base.module';
import { NumberPipe } from '../../../functions/pipes/converter.pipe';

//#endregion


//#region COMPONENT
@Component
(
    {
        selector: 'app-employee-detail',
        standalone: true,
        imports: [BaseModule, NumberPipe],
        templateUrl: './employee-detail.component.html',
        styleUrl: './employee-detail.component.scss'
    }
)

//#endregion


//#region CLASS

export class EmployeeDetailComponent implements OnInit
{
    //#region DECLARATION

    public _modelEmployee?: EmployeeModel;

    //#endregion


    //#region CONSTRUCTOR

    constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService)
    {
        this._modelEmployee = new EmployeeModel();
    }

    //#endregion


    //#region INITIALIZATION

    ngOnInit(): void
    {
        this.callGetEmployeeByUsername();
    }

    //#endregion


    //#region SERVICE

    private callGetEmployeeByUsername(): void
    {
        const usernameFromUrl = this.route.snapshot.paramMap.get('username');
        const allEmployees = this.employeeService.getAllEmployees();
        
        this._modelEmployee = allEmployees.find(
            (emp) => emp.username === usernameFromUrl
        );
    }

    //#endregion


    //#region NAVIGATION

    public goToList(): void
    {
        this.router.navigate(["home", "employee"]);
    }

    //#endregion
}

//#endregion
