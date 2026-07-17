//#region IMPORT

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputselectComponent } from "../../components/bases/input/inputselect/inputselect.component";

//#endregion


//#region Module

@NgModule
(
    {
        imports:
    [
        CommonModule,
        FormsModule,
        InputselectComponent,
    ],
        exports:
    [
        CommonModule,
        FormsModule,
        InputselectComponent,
    ],
    }
)

//#endregion


//#region  CLASS

export class BaseNavModule { }

//#endregion