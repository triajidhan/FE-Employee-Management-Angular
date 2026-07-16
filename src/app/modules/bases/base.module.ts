//#region IMPORT

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputModule } from "../input.module";
import { NavModule } from "../nav.module";

//#endregion


//#region Module

@NgModule
(
    {
        imports:
    [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        InputModule,
        NavModule,
    ],
        exports:
    [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        InputModule,
        NavModule,
    ],
    }
)

//#endregion


//#region  CLASS

export class BaseModule { }

//#endregion