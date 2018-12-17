import { DesignComponentToRender } from "../component-factory/design-component-to-render";
import { CreateElement } from "vue";
import { IComponentToRender } from "../models/icomponent-to-render";
import { AttributeDefinition } from "../models/attribute-definition";
import { ScopedSlot } from "vue/types/vnode";
import { ComponentToRender } from "../models/component-to-render";
import { ComponentFactory } from "../component-factory/component-factory";

export abstract class ComponentDecorator extends DesignComponentToRender {
    constructor(component: ComponentToRender, factory: ComponentFactory) {
        super(component, factory);
    }
}