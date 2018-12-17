import { IComponentToRender } from "../models/icomponent-to-render";
import { CreateElement } from "vue";
import { ComponentToRender } from "../models/component-to-render";

export abstract class ComponentFactory {

    public abstract createComponentToRender(component: IComponentToRender): ComponentToRender;

}