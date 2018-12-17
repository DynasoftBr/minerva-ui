import { ComponentDecorator } from "./component-decorator";
import { VNodeDirective, CreateElement } from "vue";
import { IComponentToRender } from "../models/icomponent-to-render";
import { ComponentToRender } from "../models/component-to-render";

export class DraggableDecorator extends ComponentDecorator {

    public get directives(): VNodeDirective[] {
        return [
            ...(super.directives || []),
            {
                name: "draggable-component",
                value: this.component
            } as VNodeDirective
        ];
    }
    public set directives(v: VNodeDirective[]) {
        super.directives = v;
    }

    public render(createElement: CreateElement) {
        console.log({...this});
        return createElement(this.name, this,
            this.children.map((child) => child.render(createElement)));
    }
}