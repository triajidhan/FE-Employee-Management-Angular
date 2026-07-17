//#region IMPORT

import { Component, EventEmitter, Injectable, Input, Output } from "@angular/core";
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats, NativeDateAdapter } from "@angular/material/core";
import { BaseInputModule } from "../../../../modules/bases/baseinput.module";

//#endregion


//#region CONSTANT

export const dateFormat: MatDateFormats =
{
    parse: {
        dateInput: "dd/MM/YYYY",
    },
    display: {
        dateInput: "dd/MM/YYYY",
        monthYearLabel: "dd MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "dd MMMM YYYY",
    },
};

//#endregion


//#region INJECTABLE

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter
{
    public override format(date: Date, displayFormat: string): string
    {
        const numberDate = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (displayFormat === "dd/MM/YYYY")
        {
            return `${numberDate < 10 ? "0" : ""}${numberDate}/${month < 10 ? "0" : ""}${month}/${year}`;
        }

        return super.format(date, displayFormat);
    }
}

//#endregion


//#region COMPONENT

@Component
(
    {
        selector: "app-inputdate",
        standalone: true,
        imports: [BaseInputModule],
        templateUrl: "./inputdate.component.html",
        styleUrl: "./inputdate.component.scss",
        providers: [
            { provide: DateAdapter, useClass: CustomDateAdapter },
            { provide: MAT_DATE_FORMATS, useValue: dateFormat },
        ]
    }
)

//#endregion


//#region CLASS

export class InputdateComponent
{
    //#region DECLARATION

    @Input() public placeholder: string = "Select Date";
    @Input() public disabled: boolean = false;
    @Input() public readonly: boolean = false;
    @Input() public date?: Date;
    @Input() public maxDate?: Date;

    @Output() public dateChange = new EventEmitter<Date>();


    //#endregion


    //#region FUNCTION

    public onDateChange(newDateString: string)
    {
        const newDate = new Date(newDateString);
        this.dateChange.emit(newDate);
    }

    //#endregion

}

//#endregion
