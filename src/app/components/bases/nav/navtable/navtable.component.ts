//#region IMPORT

import { Component } from "@angular/core";
import { BaseNavModule } from "../../../../modules/bases/basenav.module";

//#endregion


//#region COMPONENT

@Component
(
    {
        selector: "app-navtable",
        standalone: true,
        imports: [BaseNavModule],
        templateUrl: "./navtable.component.html",
        styleUrl: "./navtable.component.scss"
    }
)

//#endregion


//#region CLASS

export class NavtableComponent 
{
    //#region DECLARATION

    public _arrayNavButton =
        [
            {
                number: 1,
                active: true,
            },
            {
                number: 2,
                active: false,
            },
            {
                number: 3,
                active: false,
            },
            {
                number: 4,
                active: false,
            },
        ];

    //#endregion
}

//#endregion