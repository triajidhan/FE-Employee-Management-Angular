//#region IMPORT

import { NgModule } from "@angular/core";
import { NavtableComponent } from "../components/bases/nav/navtable/navtable.component";

//#endregion


//#region Module

@NgModule
(
    {
        imports:
    [
        NavtableComponent,
    ],
        exports:
    [
        NavtableComponent,
    ],
    }
)

//#endregion


//#region  CLASS

export class NavModule { }

//#endregion