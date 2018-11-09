export interface ToolbarButton {
    label?: string;
    id?: string;
    iconClass?: string;
    onClick?: (e: Event) => void;
}