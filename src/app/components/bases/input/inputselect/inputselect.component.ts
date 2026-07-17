//#region IMPORT

import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { BaseInputModule } from "../../../../modules/bases/baseinput.module";
import { SelectItem } from "../../../../interfaces/selectitem";


//#endregion


//#region COMPONENT

@Component
(
    {
        selector: "app-inputselect",
        standalone: true,
        imports: [BaseInputModule],
        templateUrl: "./inputselect.component.html",
        styleUrl: "./inputselect.component.sass"
    }
)

//#endregion


//#region CLASS

export class InputselectComponent implements OnInit
{
    //#region DECLARATION

    @ViewChild("selectInput") public selectInput!: ElementRef<HTMLInputElement>;

    @Input() public items?: Array<SelectItem>;
    @Input() public selectedItemId?: string | number;
    @Input() public placeholder: string = "Select Data";
    @Input() public searchOption: boolean = false;
    @Input() public disabled: boolean = false;
    @Input() public readonly: boolean = false;

    @Output() public selectionChange = new EventEmitter<string>();

    public _booleanSelectOpen: boolean;
    public _stringSelectedOption?: string;
    public _stringInput?: string;

    public _arrayFilteredItems: Array<SelectItem>;

    //#endregion


    //#region CONSTRUCTOR

    public constructor()
    {
        this._booleanSelectOpen = false;
        this._arrayFilteredItems = [];
    }

    //#endregion


    //#region INITIALIZATION

    public ngOnInit(): void
    {
        if (this.items)
        {
            this._arrayFilteredItems = [...this.items];
            for (const item of this.items)
            {
                if (item.id === this.selectedItemId)
                {
                    this._stringSelectedOption = item.name;
                }
            }
        }
    }

    //#endregion


    //#region GETTER

    public getHeightOptionContainer(): string
    {
        if (this._booleanSelectOpen)
        {
            if (this._arrayFilteredItems.length < 7)
            {
                return this._arrayFilteredItems?.length ? `${(this._arrayFilteredItems.length * 34) + 10}px` : "44px";
            }
            else
            {
                return "209px";
            }
        }
        else
        {
            return "0";
        }
    }

    //#endregion


    //#region FUNCTION

    public onFocus(): void
    {
        this._booleanSelectOpen = true;
    }

    public onBlur(event: FocusEvent): void
    {
        if (event.relatedTarget)
        {
            setTimeout(() =>
            {
                this._booleanSelectOpen = false;
            }, 250);
        }
        else
        {
            this._booleanSelectOpen = false;
        }
    }

    public onClickOption(selectItem: SelectItem): void
    {
        this._stringSelectedOption = selectItem.name;
        this._stringInput = "";

        this.selectionChange.emit(String(selectItem.id));
    }

    public onClickToFocus(): void
    {
        if (!this.readonly)
        {
            this.selectInput.nativeElement.focus();
        }
    }

    public onInputFilterList(event: Event): void
    {
        const inputElement = event.target as HTMLInputElement;
        const searchTerm = inputElement.value.toLowerCase();

        if (this.items)
        {
            this._arrayFilteredItems = this.items.filter
            (item =>
                item?.name?.toLowerCase().includes(searchTerm)
            );
        }
    }
    
    //#endregion
}

//#endregion