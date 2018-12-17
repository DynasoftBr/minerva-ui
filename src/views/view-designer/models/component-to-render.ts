import { AttributeDefinition } from "./attribute-definition";

import { IComponentToRender } from "./icomponent-to-render";
import { CreateElement, VNodeDirective } from "vue";
import { ScopedSlot, VNode } from "vue/types/vnode";

export abstract class ComponentToRender implements IComponentToRender {
    public static parse(component: string): IComponentToRender {
        return JSON.parse(component);
    }

    public abstract name: string;
    public abstract children?: ComponentToRender[];
    public abstract key?: string | number;
    public abstract slot?: string;
    public abstract scopedSlots?: { [key: string]: ScopedSlot };
    public abstract ref?: string;
    public abstract tag?: string;
    public abstract staticClass?: string;
    public abstract class?: any;
    public abstract staticStyle?: { [key: string]: any; };
    public abstract style?: object | object[];
    public abstract props?: { [key: string]: any; };
    public abstract attrs?: { [key: string]: any; };
    public abstract domProps?: { [key: string]: any; };
    public abstract hook?: { [key: string]: Function; };
    public abstract on?: { [key: string]: Function | Function[]; };
    public abstract nativeOn?: { [key: string]: Function | Function[]; };
    public abstract transition?: object;
    public abstract show?: boolean;
    public abstract inlineTemplate?: { render: Function; staticRenderFns: Function[]; };
    public abstract directives?: VNodeDirective[];
    public abstract keepAlive?: boolean;

    public abstract render(createElement: CreateElement): VNode;
}

