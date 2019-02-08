import { ComponentToRender } from "../models/component-to-render";
import { IComponentToRender } from "../models/icomponent-to-render";

export abstract class ComponentFactory {

    public abstract createComponent(component: IComponentToRender): ComponentToRender;

}