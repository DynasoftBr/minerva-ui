import Vue, { DirectiveOptions } from "vue";
import { ComponentElement } from "../models/component-element";
import { ComponentToRender } from "../models/component-to-render";

class ComponentDirectiveDefinition implements DirectiveOptions {
    public bind = (el: ComponentElement, binding, vnode) => {
        const component: ComponentToRender = binding.value;
        el.component = component;
    }

    public unbind = (el: ComponentElement, binding, vnode) => {
        delete el.component;
    }

    public update = (el: ComponentElement, binding, vnode) => {
        const component: ComponentToRender = binding.value;
        el.component = component;
    }
}

export const ComponentDirective = new ComponentDirectiveDefinition();

Vue.directive("component-directive", ComponentDirective);