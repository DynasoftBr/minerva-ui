import DropdownTreeviewItem from "../dropdown-treeview/dropdown-treeview-item/dropdown-treeview-item";

export interface TreeviewNode {
    text: string;
    icon?: string;
    children?: TreeviewNode[];
    open?: boolean;
    enabled?: boolean;
    selected?: boolean;
    value?: string;
    el?: DropdownTreeviewItem;
}