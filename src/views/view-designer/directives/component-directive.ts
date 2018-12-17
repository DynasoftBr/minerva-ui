import Vue, { DirectiveOptions } from "vue";
import { IComponentToRender } from "../models/icomponent-to-render";
import { ComponentElement } from "../models/component-element";

class ComponentDirectiveDefinition implements DirectiveOptions {
    public bind = (el: ComponentElement, binding, vnode) => {
        const component: IComponentToRender = binding.value;
        el.component = component;
    }

    public unbind = (el: ComponentElement, binding, vnode) => {
        delete el.component;
    }

    public update = (el: ComponentElement, binding, vnode) => {
        const component: IComponentToRender = binding.value;
        el.component = component;
    }
}

export const ComponentDirective = new ComponentDirectiveDefinition();

Vue.directive("component-directive", ComponentDirective);