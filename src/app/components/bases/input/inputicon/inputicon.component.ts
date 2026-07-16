//#region IMPORT

import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { BaseInputModule } from "../../../../modules/bases/baseinput.module";

//#endregion


//#region COMPONENT

@Component
(
    {
        selector: "app-inputicon",
        standalone: true,
        imports: [BaseInputModule],
        templateUrl: "./inputicon.component.html",
        styleUrl: "./inputicon.component.scss",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => InputiconComponent),
                multi: true
            }
        ]
    }
)

//#endregion


//#region CLASS

export class InputiconComponent 
{
    //#region DECLARATION

    @Input() public position: "left" | "right" = "right";
    @Input() public placeholder: string = "Input Data";
    @Input() public icon: string = "icon-magnifying-glass";
    @Input() public disabled: boolean = false;
    @Input() public readonly: boolean = false;

    public _stringValue: string;

    //#endregion


    //#region CONSTRUCTOR

    public constructor()
    {
        this._stringValue = "";
    }

    //#endregion


    //#region FUNCTION

    public writeValue(value: string): void
    {
        this._stringValue = value;
    }

    public registerOnChange(fn: (value: string) => void): void
    {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void
    {
        this.onTouched = fn;
    }

    private onChange: (value: string) => void = () => { };
    private onTouched: () => void = () => { };

    public onInputChange(event: Event): void
    {
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;
        this._stringValue = value;
        this.onChange(value);
        this.onTouched();
    }

    //#endregion
}

//#endregion