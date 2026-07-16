//#region IMPORT

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseNavModule } from "../../../../modules/bases/basenav.module";
import { TableModel } from "../../../../models/table.model";

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

    @Input() public _modelTable?: TableModel = new TableModel();
    @Output() public pageChange = new EventEmitter<number>();

    //#endregion


    //#region CONSTRUCTOR

    constructor()
    {

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

    //#endregion
}

//#endregion