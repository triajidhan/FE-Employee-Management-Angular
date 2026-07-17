//#region IMPORT

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import { EmployeeInsertComponent } from "./employee-insert/employee-insert.component";

//#endregion

//#region ROUTE

const arrayRoutes: Routes = [
    {
        path: "",
        component:EmployeeListComponent
    },
    {
        path: "insert",
        component: EmployeeInsertComponent
    },
    {
        path: "detail/:usernamel",
        component: EmployeeDetailComponent
    }
];

//#endregion


//#region MODULE

@NgModule({
    imports: [
        RouterModule.forChild(arrayRoutes)
    ],
    exports: [
        RouterModule
    ]
})

//#endregion


//#region CLASS

export class EmployeeRoutingModule { }

//#endregion