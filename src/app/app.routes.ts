import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';

export const routes: Routes =
[
        {
            path: "",
            redirectTo: "signin",
            pathMatch: "full"
        },
        {
            path: "signin",
            redirectTo: "signin",
            pathMatch: "full"
        },
        {
            path: "signin",
            component: SigninComponent,
        },
        {
            path: "home",
            component: HomeComponent,
            children:
            [
                    {
                        path: "dashboard",
                        component: DashboardComponent
                    },
                    {
                        path: "employee",
                        loadChildren: () => import("./components/employee/employee.module").then(pageModule => pageModule.EmployeeModule),

                    },
            ]
        },

];
