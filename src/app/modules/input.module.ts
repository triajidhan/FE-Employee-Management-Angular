//#region IMPORT

import { NgModule } from "@angular/core";
import { InputdateComponent } from "../components/bases/input/inputdate/inputdate.component";
import { InputiconComponent } from "../components/bases/input/inputicon/inputicon.component";
import { InputselectComponent } from "../components/bases/input/inputselect/inputselect.component";

//#endregion


//#region Module

@NgModule
(
    {
        imports:
    [
        InputdateComponent,
        InputiconComponent,
        InputselectComponent,
    ],
        exports:
    [
        InputdateComponent,
        InputiconComponent,
        InputselectComponent,
    ],
    }
)

//#endregion


//#region  CLASS

export class InputModule { }

//#endregion