import { VNodeDirective } from "vue";
import { ScopedSlot, VNode } from "vue/types/vnode";

export interface IComponentToRender {
    name: string;
    children?: IComponentToRender[];
    key?: string | number;
    slot?: string;
    scopedSlots?: { [key: string]: ScopedSlot };
    ref?: string;
    tag?: string;
    staticClass?: string;
    class?: any;
    staticStyle?: { [key: string]: any; };
    style?: object | object[];
    props?: { [key: string]: any; };
    attrs?: { [key: string]: any; };
    domProps?: { [key: string]: any; };
    hook?: { [key: string]: Function; };
    on?: { [key: string]: Function | Function[]; };
    nativeOn?: { [key: string]: Function | Function[]; };
    transition?: object;
    show?: boolean;
    inlineTemplate?: { render: Function; staticRenderFns: Function[]; };
    directives?: VNodeDirective[];
    keepAlive?: boolean;
}