import { Component, inject, OnInit } from '@angular/core';
import { BaseModule } from '../../../modules/bases/base.module';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { TableModel } from '../../../models/table.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    
    private _toastr = inject(ToastrService);
    public _formSearchEmployee!: FormGroup;
    public _employeeTable: TableModel;
    public _booleanSubmitSearch: boolean;
    public _arrayModelEmployee: Array<EmployeeModel>;
    
    //#endregion


    //#region CONSTRUCTOR

    constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService)
    {
        this._employeeTable = new TableModel;
        this._booleanSubmitSearch = false;
        this._arrayModelEmployee = [];
    }

    //#endregion


    //#region INITIALIZATION

    ngOnInit(): void
    {
        this.setFormSearchEmployee();
        this.callGetAllEmployee();
    }

    //#endregion


    //#region SETTER

    private setFormSearchEmployee(): void
    {
        this._formSearchEmployee = this.formBuilder.group
        (
            {
                name: ["", [Validators.pattern(/^(.{3,})?$/)]],
                email: ["", [Validators.pattern(/^(.{3,})?$/)]]
            },
            {
                validators: this.atLeastOneFilled
            }
        );
    }

    //#endregion


    //#region GETTER

    public get fcSearchEmployee() { return this._formSearchEmployee.controls; }


    //#endregion


    //#region FUNCTION

    public onPageChange(newPage: number): void
    {
        if (this._employeeTable)
        {
            this._employeeTable.currentPage = newPage;
            this.callGetAllEmployee();
        }
    }

    public onPaginationChange(newPagination: number): void
    {
        if (this._employeeTable)
        {
            if (this._employeeTable.pagination! < newPagination)
            {
                const maxPages = Math.ceil(this._employeeTable.totalData! / newPagination);

                if (this._employeeTable.currentPage! > maxPages)
                {
                    this._employeeTable.currentPage = maxPages;
                }
            }
            
            this._employeeTable.pagination = newPagination;
            this.callGetAllEmployee();
        }
    }

    public onSearch(): void
    {
        this._booleanSubmitSearch = true;

        if (this._formSearchEmployee.invalid)
        {
            if (this._formSearchEmployee.errors?.['requireOne'])
            {
                alert("Gagal mencari! Harap isi salah satu kolom (Nama atau Email) terlebih dahulu.");
            }
            else if (this.fcSearchEmployee['name'].errors?.['pattern']) {
                alert("Kolom NAMA kurang dari 3 karakter! Silakan tambah huruf pencarian Anda.");
            }
            else if (this.fcSearchEmployee['email'].errors?.['pattern']) {
                alert("Kolom EMAIL kurang dari 3 karakter! Silakan tambah huruf pencarian Anda.");
            }
            return;
        }

        this._employeeTable.currentPage = 1;
        const strName = this._formSearchEmployee.value.name?.toLowerCase().trim();
        const strEmail = this._formSearchEmployee.value.email?.toLowerCase().trim();

        this.callGetAllEmployee(strName, strEmail);
    }

    private atLeastOneFilled(control: AbstractControl): ValidationErrors | null
    {
        const name = control.get('name')?.value;
        const email = control.get('email')?.value;

        if (!name?.trim() && !email?.trim())
        {
            return { requireOne: true };
        }

        return null;
    }

    public clearSearch(): void
    {
        this._formSearchEmployee.reset();
        this._booleanSubmitSearch = false;

        this.callGetAllEmployee(); 
    }

    //#endregion


    //#region SERVICE

    public callGetAllEmployee(strName?: string, strEmployee?: string): void
    {
        const arrayEmployee = this.employeeService.getAllEmployees();

        const limit = this._employeeTable.pagination || 20;
        const page = this._employeeTable.currentPage || 1;

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        this._employeeTable.startData = startIndex + 1;
        
        if (!strName && !strEmployee)
        {
            this._arrayModelEmployee = arrayEmployee.slice(startIndex, endIndex);
            this._employeeTable.totalPage = Math.ceil(arrayEmployee.length / limit);
            this._employeeTable.totalData = arrayEmployee.length;
            this._employeeTable.endData = (endIndex > (this._employeeTable.totalData || 0)) ? this._employeeTable.totalData : endIndex;
        }
        else
        {
            const filteredArrayEmployeee = arrayEmployee.filter((employee) =>
            {    
                const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
                const employeeEmail = employee.email?.toLowerCase() || '';

                const matchName = strName ? fullName.includes(strName) : true;
                const matchEmail = strEmployee ? employeeEmail.includes(strEmployee) : true;

                return matchName && matchEmail;
            });

            this._arrayModelEmployee = filteredArrayEmployeee.slice(startIndex, endIndex);
            this._employeeTable.totalPage = Math.ceil(filteredArrayEmployeee.length / limit);
            this._employeeTable.totalData = filteredArrayEmployeee.length;
            this._employeeTable.endData = (endIndex > (this._employeeTable.totalData || 0)) ? this._employeeTable.totalData : endIndex;
        }
    }

    public callDeleteEmployeeByUsername(username?: string, name?: string): void
    {    
        const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus karyawan: ${name}?`);

        if (konfirmasi && username)
        {
            this.employeeService.deleteEmployeeByUsername(username);
            this.callGetAllEmployee();

            this._toastr.error("Data karyawan berhasil dihapus!", "Sukses");
        }
    }

    //#endregion


    //#region NAVIGATION

    public goToInsert(): void
    {
        this.router.navigate(["home", "employee", "insert"]);
    }

    public goToupdate(username?: string): void
    {
        this.router.navigate(["home", "employee", "update", username]);
    }

    public goToDetail(username?: string): void
    {
        this.router.navigate(["home", "employee","detail", username]);
    }

    //#endregion
}
