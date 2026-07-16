//#region IMPORT

import { NgModule } from "@angular/core";
import { InputdateComponent } from "../components/bases/input/inputdate/inputdate.component";
import { InputiconComponent } from "../components/bases/input/inputicon/inputicon.component";

//#endregion


//#region Module

@NgModule
(
    {
        imports:
    [
        InputdateComponent,
        InputiconComponent,
    ],
        exports:
    [
        InputdateComponent,
        InputiconComponent,
    ],
    }
)

//#endregion


//#region  CLASS

export class InputModule { }

//#endregion