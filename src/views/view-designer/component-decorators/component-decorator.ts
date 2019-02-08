import { DesignComponentToRender } from "../component-factory/design-component-to-render";
import { ComponentToRender } from "../models/component-to-render";
import { ComponentFactory } from "../component-factory/component-factory";
import { VNodeDirective } from "vue";

export class ComponentDecorator extends DesignComponentToRender {
    constructor(component: ComponentToRender, factory: ComponentFactory) {
        super(component, factory);
    }

    public buildData(): ComponentToRender {
        const data = super.buildData();

        data.directives = data.directives || [];
        data.directives.push({
            name: "component-directive",
            value: this
        } as VNodeDirective);

        return data;
    }
}