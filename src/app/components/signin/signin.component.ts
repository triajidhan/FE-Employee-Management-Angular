//#region IMPORT

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Signin } from '../../interfaces/signin';
import { Router } from '@angular/router';

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

    public formLogin!: FormGroup;
    public signinAdmin!: Signin;
    public booleanSubmitted: boolean;

    //#endregion


    //#region CONSTRUCTOR

    constructor(private formBuilder: FormBuilder, private router: Router)
    {
        this.booleanSubmitted = false;
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
        this.formLogin = this.formBuilder.group
        ({
            username: ["", [Validators.required, Validators.minLength(4)]],
            password: ["", [Validators.required, Validators.minLength(6)]]
        })
    }

    private setSigninAdmin(): void
    {
        this.signinAdmin =
        {
            username: "superadmin",
            password: "super_admin"
        };
    }

    //#endregion


    //#region GETTER

    public get fcLogin() { return this.formLogin.controls; }

    //#endregion


    //#region FUNCTION

    public onSubmit(): void
    {
        this.booleanSubmitted = true;

        if (this.formLogin.invalid)
        {
            alert('Username atau Password tidak sesuai!');
        }
        else if (this.formLogin.value.username !== this.signinAdmin.username)
        {
            alert(`Maaf, Username "${this.formLogin.value.username}" tidak terdaftar di sistem!`);
        }
        else if (this.formLogin.value.password !== this.signinAdmin.password)
        {
            alert("Password yang Anda masukkan tidak sesuai!");
        }
        else
        {
            alert(`Selamat Datang, ${this.formLogin.value.username}!`);
            this.router.navigate(["/home/dashboard"]);
        }

    }

    //#endregion

}
