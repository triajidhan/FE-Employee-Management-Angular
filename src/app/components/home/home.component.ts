//#region IMPORT

import { Component } from "@angular/core";
import { BaseModule } from "../../modules/bases/base.module";
import { Menu } from "../../interfaces/menu";
import { Router } from "@angular/router";

//#endregion


//#region COMPONENT

@Component
    (
        {
            selector: "app-home",
            standalone: true,
            imports: [BaseModule],
            templateUrl: "./home.component.html",
            styleUrl: "./home.component.scss"
        }
    )

//#endregion


//#region CLASS

export class HomeComponent {
    //#region DECLARATION

    public _booleanToggleNavigation: boolean;
    public _arrayMenu: Array<Menu>;

    private _stringActiveRoute: string;

    //#endregion


    //#region CONSTRUCTOR

    public constructor(private _router: Router) {
        this._booleanToggleNavigation = true;
        this._stringActiveRoute = "dashboard";
        this._arrayMenu = this.setArrayMenu();
    }

    //#endregion


    //#region SETTER

    private setArrayMenu(): Array<Menu> {
        const arrayMenu =
            [
                {
                    title: "Dashboard",
                    icon: "icon-house",
                    active: false,
                    open: false,
                    route: "dashboard"
                },
                {
                    title: "Employee",
                    icon: "icon-user",
                    active: false,
                    open: false,
                    route: "employee"
                }
            ];

        return arrayMenu;
    }

    //#endregion


    //#region GETTER

    public getHeightMenu(numberLength?: number): string {
        return numberLength ? `${numberLength * 38.5}px` : "0";
    }

    //#endregion


    //#region FUNCTION

    public toggleMenu(): void {
        this._booleanToggleNavigation = !this._booleanToggleNavigation;
    }

    public clickMenuList(stringMenuTitle?: string): void {
        for (const menu of this._arrayMenu) {
            if (menu.title === stringMenuTitle) {
                menu.open = !menu.open;

                if (menu.route && !menu.arraySubMenu) {
                    this._router.navigate(["home", menu.route]);
                }
            }
            else {
                menu.open = false;
            }
        }
    }

    public clickSubMenuList(stringMenuTitle?: string, stringSubMenuTitle?: string): void {
        const arrayStringRoute = ["home"];

        for (const menu of this._arrayMenu) {
            if (menu.title === stringMenuTitle) {
                if (menu.route) {
                    arrayStringRoute.push(menu.route);
                }

                if (menu.arraySubMenu) {
                    for (const subMenu of menu.arraySubMenu) {
                        if (subMenu.title === stringSubMenuTitle) {
                            if (subMenu.route) {
                                arrayStringRoute.push(subMenu.route);
                            }
                            this._router.navigate(arrayStringRoute);
                        }
                    }
                }
            }
        }
    }

    //#endregion

}

//#endregion