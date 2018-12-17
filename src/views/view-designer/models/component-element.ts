import { IComponentToRender } from "./icomponent-to-render";

export interface ComponentElement extends HTMLElement {
    component: IComponentToRender;
}