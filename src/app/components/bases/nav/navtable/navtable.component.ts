//#region IMPORT

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseNavModule } from "../../../../modules/bases/basenav.module";
import { TableModel } from "../../../../models/table.model";
import { SelectItem } from "../../../../interfaces/selectitem";
import { ARRAY_ROWPERPAGE } from "../../../../constants/row-per-page.constant";

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

export class NavtableComponent implements OnInit
{
    //#region DECLARATION

    @Input() public _modelTable?: TableModel = new TableModel();
    @Output() public pageChange = new EventEmitter<number>();
    @Output() public paginationChange = new EventEmitter<number>();

    public _arraySelectItemRow: Array<SelectItem>;

    //#endregion


    //#region CONSTRUCTOR

    constructor()
    {
        this._arraySelectItemRow = [];
    }

    //#endregion


    //#region INITIALIZATION

    public ngOnInit(): void
    {
        this.setArraySelectItemRow()
    }

    //#endregion


    //#region SETTER

    private setArraySelectItemRow(): void
    {
        for (let index = 0; index < ARRAY_ROWPERPAGE.length; index++) {
            const selectItem: SelectItem =
            {
                id: ARRAY_ROWPERPAGE[index],
                name: String(ARRAY_ROWPERPAGE[index]),
                disabled: false,
                arraySelectItem: []

            };

            this._arraySelectItemRow.push(selectItem);
        }
    }

    //#endregion


    //#region FUNCTION

    public oToNextPage(): void
    {
        if (this._modelTable?.currentPage && this._modelTable?.totalPage && this._modelTable?.currentPage < this._modelTable?.totalPage)
        {
            this.pageChange.emit(this._modelTable.currentPage + 1);
        }
    }

    public goToPrevPage(): void
    {
        if (this._modelTable?.currentPage && this._modelTable?.currentPage > 1)
        {
            this.pageChange.emit(this._modelTable.currentPage - 1);
        }
    }

    public onPaginationChange(selectedPagination: string): void
    {
        if (this._modelTable)
        {
            this.paginationChange.emit(Number(selectedPagination));
        }
    }

    //#endregion
}

//#endregion