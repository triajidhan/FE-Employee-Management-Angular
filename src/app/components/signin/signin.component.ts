//#region IMPORT

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Signin } from '../../interfaces/signin';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//#endregion


//#region COMPONENT

@Component
(
    {
        selector: 'app-signin',
        standalone: true,
        imports: [ReactiveFormsModule, CommonModule],
        templateUrl: './signin.component.html',
        styleUrl: './signin.component.scss'
    }
)

//#endregion


//#region CLASS

export class SigninComponent implements OnInit
{

    //#region DECLARATION

    public _formLogin!: FormGroup;
    public _signinAdmin!: Signin;
    public _booleanSubmitted: boolean;

    //#endregion


    //#region CONSTRUCTOR

    constructor
    (
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router
    )
    {
        this._booleanSubmitted = false;
    }
    
    //#endregion
    

    //#region INITIALIZATION

    public ngOnInit(): void
    {
        this.setFormLogin();
        this.setSigninAdmin();
    }

    //#endregion


    //#region SETTER

    private setFormLogin(): void
    {
        this._formLogin = this.formBuilder.group
        ({
            username: ["", [Validators.required, Validators.minLength(4)]],
            password: ["", [Validators.required, Validators.minLength(6)]]
        })
    }

    private setSigninAdmin(): void
    {
        this._signinAdmin =
        {
            username: "superadmin",
            password: "super_admin"
        };
    }

    //#endregion


    //#region GETTER

    public get fcLogin() { return this._formLogin.controls; }

    //#endregion


    //#region FUNCTION

    public onSubmit(): void
    {
        this._booleanSubmitted = true;

        if (this._formLogin.invalid)
        {
            alert('Username atau Password tidak sesuai!');
        }
        else if (this._formLogin.value.username !== this._signinAdmin.username)
        {
            alert(`Maaf, Username "${this._formLogin.value.username}" tidak terdaftar di sistem!`);
        }
        else if (this._formLogin.value.password !== this._signinAdmin.password)
        {
            alert("Password yang Anda masukkan tidak sesuai!");
        }
        else
        {
            this.toastr.success(`Selamat Datang, ${this._formLogin.value.username}!`, "Sukses");
            this.router.navigate(["/home/dashboard"]);
        }

    }

    //#endregion

}
