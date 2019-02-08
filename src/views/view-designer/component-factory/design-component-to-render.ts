import { ComponentToRender } from "../models/component-to-render";
import { IComponent } from "../models/icomponent";
import { CreateElement } from "vue";
import { ScopedSlot, VNodeDirective, VNodeData } from "vue/types/vnode";
import { ComponentFactory } from "./component-factory";
import { ContainerDef } from "../models/container-def";
import { IComponentToRender } from "../models/icomponent-to-render";

export class DesignComponentToRender implements ComponentToRender {
    public name: string;
    public children?: ComponentToRender[];
    public key?: string | number;
    public slot?: string;
    public scopedSlots?: { [key: string]: ScopedSlot; };
    public ref?: string;
    public tag?: string;
    public staticClass?: string;
    public class?: any;
    public staticStyle?: { [key: string]: any; };
    public style?: object | object[];
    public props?: { [key: string]: any; };
    public attrs?: { [key: string]: any; };
    public domProps?: { [key: string]: any; };
    public hook?: { [key: string]: Function; };
    public on?: { [key: string]: Function | Function[]; };
    public nativeOn?: { [key: string]: Function | Function[]; };
    public transition?: object;
    public show?: boolean;
    public inlineTemplate?: { render: Function; staticRenderFns: Function[]; };
    public directives?: VNodeDirective[];
    public keepAlive?: boolean;
    public isRootInsert: boolean;
    public isComment: any;

    constructor(protected readonly component: IComponentToRender, protected factory: ComponentFactory) {

        Object.assign(this, component);
        this.children = (component.children || [])
            .map((child) => factory.createComponent(child));
    }

    public render(createElement: CreateElement) {
        const data = this.buildData();

        return createElement(this.name, data,
            data.children.map((child) => child.render(createElement)));
    }

    public buildData(): ComponentToRender {
        const data: ComponentToRender = JSON.parse(JSON.stringify(this));
        data.children = [...this.children];

        return data;
    }
}