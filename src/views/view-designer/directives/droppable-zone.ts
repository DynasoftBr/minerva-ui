import Vue, { DirectiveOptions } from "vue";
import { ComponentToRender } from "../models/component-to-render";
import { AllowedComponents } from "../models/allowed-components";

class DroppableZoneDefinition implements DirectiveOptions {

    public bind = (el: HTMLElement, binding, vnode) => {
        el.classList.add("droppable-zone");

        (el as any).componentToRender = binding.value.component;
        (el as any).allowedComponents = binding.value.allowedComponents || AllowedComponents.All;
        (el as any).maxElements = binding.value.maxElements || 500;

        el.addEventListener("dragover", (e: DragEvent) => this.onDragOver(e));
        el.addEventListener("dragleave", (e: DragEvent) => this.onDragLeave(e));
        el.addEventListener("drop", (e: DragEvent) => this.onDrop(e));
    }

    public unbind = (el: HTMLElement, binding, vnode) => {
        el.removeEventListener("dragover", (e: DragEvent) => this.onDragOver(e));
        el.removeEventListener("dragleave", (e: DragEvent) => this.onDragLeave(e));
        el.removeEventListener("drop", (e: DragEvent) => this.onDrop(e));
    }

    public update = (el: HTMLElement, binding, vnode) => {
        binding.value = binding.value || {};
        (el as any).componentToRender = binding.value.component;
        (el as any).allowedComponents = binding.value.allowedComponents || AllowedComponents.All;
        (el as any).maxElements = binding.value.maxElements || 1;
    }

    private canDrop(componentName: AllowedComponents, el: any) {
        if (el.maxElements > -1 && el.componentToRender.children.length >= el.maxElements)
            return false;

        if (el.allowedComponents != AllowedComponents.All && !(el.allowedComponents & componentName))
            return false;

        return true;
    }

    private onDragOver(e: DragEvent): any {
        const el: HTMLElement = e.target as HTMLElement;

        const componentName = AllowedComponents[e.dataTransfer.types[e.dataTransfer.types.length - 1]];

        if (!this.canDrop(componentName, el)) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            return;
        }

        e.preventDefault();
        el.classList.add("dragging-over");
    }

    private onDragLeave(e: DragEvent): any {
        const el: HTMLElement = e.target as HTMLElement;
        el.classList.remove("dragging-over");

        const componentName = AllowedComponents[e.dataTransfer.types[e.dataTransfer.types.length - 1]];

        if (!this.canDrop(componentName, el)) {
            e.stopPropagation();
            return;
        }

        e.preventDefault();
    }

    private onDrop(e: DragEvent): any {
        const el = e.target as HTMLElement;
        el.classList.remove("dragging-over");

        const comp = ComponentToRender.parse(e.dataTransfer.getData("componentToRender"));
        const componentName = AllowedComponents[comp.name];

        if (!this.canDrop(componentName, el)) {
            e.stopPropagation();
            return;
        }

        e.stopPropagation();
        e.preventDefault();

        (el as any).componentToRender.addChild(comp.name, comp.children, comp.props);
    }

}

export const DroppableZone = new DroppableZoneDefinition();

Vue.directive("draggable-component", DroppableZone);