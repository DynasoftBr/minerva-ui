import Vue, { DirectiveOptions } from "vue";
import { ComponentToRender } from "../models/component-to-render";
import { ComponentElement } from "../models/component-element";

class DraggableComponentDefinition implements DirectiveOptions {

    public bind = (el: ComponentElement, binding, vnode) => {
        el.component = binding.value;
        el.setAttribute("draggable", "true");
    }

    public unbind = (el: ComponentElement, binding, vnode) => {
        delete el.component;
        el.setAttribute("draggable", "false");
    }

    public update = (el: ComponentElement, binding, vnode) => {
        el.component = binding.value;
        el.setAttribute("draggable", "true");
    }
}

export const DraggableComponent = new DraggableComponentDefinition();

Vue.directive("draggable-component", DraggableComponent);