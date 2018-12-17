import { IComponentToRender } from "./icomponent-to-render";
import Sortable from "sortablejs";

export interface SortableElement extends HTMLElement {
    component: IComponentToRender;
    sortable: Sortable;
}