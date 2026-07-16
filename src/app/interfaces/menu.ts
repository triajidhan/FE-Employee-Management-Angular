export interface Menu
{
    title?: string;
    icon?: string;
    route?: string;

    open?: boolean;
    active?: boolean;

    arraySubMenu?: Array<Menu>;
}
