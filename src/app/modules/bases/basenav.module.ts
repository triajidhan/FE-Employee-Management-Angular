//#region IMPORT

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

//#endregion


//#region Module

@NgModule
(
    {
        imports:
    [
        CommonModule,
        FormsModule,
    ],
        exports:
    [
        CommonModule,
        FormsModule,
    ],
    }
)

//#endregion


//#region  CLASS

export class BaseNavModule { }

//#endregion