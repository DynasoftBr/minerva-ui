import { ComponentToRender } from "./component-to-render";

export interface ComponentElement extends HTMLElement {
    component: ComponentToRender;
}