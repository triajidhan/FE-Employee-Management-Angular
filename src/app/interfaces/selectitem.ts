export interface SelectItem
{
    id?: string | number;
    name?: string;
    disabled?: boolean;
    arraySelectItem?: Array<SelectItem>;
}
