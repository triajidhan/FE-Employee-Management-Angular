//#region IMPORT

import { Component, OnInit, inject } from '@angular/core';
import { BaseModule } from '../../../modules/bases/base.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from '../../../interfaces/selectitem';
import { ARRAY_GROUPS } from '../../../constants/group.constant';
import { EmployeeModel } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { ToastrService } from 'ngx-toastr'

//#endregion


//#region COMPONENT

@Component
(
    {
        selector: 'app-employee-insert',
        standalone: true,
        imports: [BaseModule],
        templateUrl: './employee-insert.component.html',
        styleUrl: './employee-insert.component.scss'
    }
)

//#endregion


//#region CLASS

export class EmployeeInsertComponent implements OnInit
{
    //#region DECLARATION

    private _toastr = inject(ToastrService);
    public _formEmployee!: FormGroup;
    public _arraySelectItem: Array<SelectItem>;
    public _currentDate: Date;
    public _booleanUpdatePage: boolean;
    public _employeeModel: EmployeeModel;

    //#endregion


    //#region CONSTRUCTOR

    constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private employeeService: EmployeeService)
    {
        this._arraySelectItem = [];
        this._currentDate = new Date();
        this._booleanUpdatePage = false;
        this._employeeModel = new EmployeeModel();
    }

    //#endregion


    //#region INITIALIZATION

    ngOnInit(): void
    {
        this.setFormEmployee();
        this.checkPage();
        this.setArraySelectItem();
    }

    //#endregion


    //#region SETTER

    private setFormEmployee(): void
    {
        this._formEmployee = this.formBuilder.group
        ({
            username: ["", [Validators.required, Validators.minLength(4)]],
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            birthDate: [null, [Validators.required]],
            basicSalary: [null, [Validators.required, Validators.min(1)]],
            status: new FormControl("Active"),
            group: ["", [Validators.required]],
            description: ["", [Validators.required]]
        });
    }

    private setArraySelectItem(): void
    {
        for (let index = 0; index < ARRAY_GROUPS.length; index++)
        {
            const selectItem: SelectItem =
            {
                id: ARRAY_GROUPS[index],
                name: ARRAY_GROUPS[index],
                disabled: false,
                arraySelectItem: []

            };

            this._arraySelectItem.push(selectItem);            
        }
    }

    //#endregion


    //#region FUNCTION

    private checkPage(): void
    {
        const usernameFromUrl = this.route.snapshot.paramMap.get('username');

        if (usernameFromUrl)
        {
            this._booleanUpdatePage = true;
            this.fillFormForUpdate(usernameFromUrl);
        }
    }

    private fillFormForUpdate(username: string): void {
        const allEmployees = this.employeeService.getAllEmployees();
        const employeeData = allEmployees.find(emp => emp.username === username);

        if (employeeData)
        {
            this._formEmployee.get('username')?.disable();
            this._formEmployee.patchValue(employeeData);
        }
    }

    public onDateChange(newDate: Date): void
    {
        if (this._formEmployee)
        {
            this._formEmployee.patchValue({
                birthDate: new Date(newDate)
            });
        }
    }

    public onGroupChange(selectedGroup: string): void
    {
        if (this._formEmployee)
        {
            this._formEmployee.patchValue({
                group: selectedGroup
            });
            this._formEmployee.get('group')?.markAsDirty();
        }
    }

    //#endregion


    //#region SERVICE

    public onSubmit(): void
    {
        if (this._formEmployee.invalid)
        {
            const inputUsername = this._formEmployee.value.username?.trim();
            const existingEmployees = this.employeeService.getAllEmployees();
            const isUsernameTake = existingEmployees.some(
                (employee) => employee.username?.toLowerCase() === inputUsername.toLowerCase()
            );

            let fieldsEmpty = false;
            Object.keys(this._formEmployee.controls).forEach(key =>
            {
                const control = this._formEmployee.get(key);
                if (control?.errors?.['required'])
                {
                    fieldsEmpty = true;
                }
            });

            if (fieldsEmpty)
            {
                alert("Gagal Simpan: Data tidak boleh ada yang kosong! Mohon lengkapi semua kolom.");
                return;
            }

            if (isUsernameTake)
            {
                alert(`Gagal Simpan: Username "${inputUsername}" SUDAH DIGUNAKAN oleh karyawan lain! Silakan cari username yang berbeda.`);
                return;
            }

            if (this._formEmployee.get('email')?.errors?.['email'])
            {
                alert("Gagal Simpan: Format email yang Anda masukkan tidak valid!");
                return;
            }

            if (this._formEmployee.get('basicSalary')?.errors?.['min'])
            {
                alert("Gagal Simpan: Gaji dasar (Basic Salary) harus lebih dari 0!");
                return;
            }

            if (this._formEmployee.get('username')?.errors?.['minlength'])
            {
                alert("Gagal Simpan: Username minimal harus berisi 4 karakter!");
                return;
            }
            

            alert("Gagal Simpan: Format inputan form Anda belum sesuai.");
            return;
        }
        
        const newEmployeeData: EmployeeModel = this._formEmployee.getRawValue();

        if (this._booleanUpdatePage)
        {
            this.employeeService.updateEmployeeByUsername(newEmployeeData.username!, newEmployeeData);

            this._toastr.warning(`Sukses! Data karyawan "${newEmployeeData.firstName}" berhasil diperbarui.`, 'Sukses');
        }
        else
        {
            this.employeeService.addEmployee(newEmployeeData);
    
            this._toastr.success(`Sukses! Karyawan "${newEmployeeData.firstName}" berhasil didaftarkan.`, 'Sukses');
        }
        
        this.goToList();
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
