import { ComponentToRender } from "../models/component-to-render";
import { IComponentToRender } from "../models/icomponent-to-render";
import { CreateElement } from "vue";
import { AttributeDefinition } from "../models/attribute-definition";
import { ScopedSlot, VNodeDirective } from "vue/types/vnode";
import { ComponentFactory } from "./component-factory";

export class DesignComponentToRender implements IComponentToRender {

    protected component: IComponentToRender;

    public get name(): string {
        return this.component.name;
    }
    public set name(v: string) {
        this.component.name = v;
    }

    private vChildren: ComponentToRender[];
    public get children(): ComponentToRender[] {
        return this.vChildren;
    }
    public set children(v: ComponentToRender[]) {
        this.vChildren = v;
    }

    public get props(): AttributeDefinition {
        return this.component.props;
    }
    public set props(v: AttributeDefinition) {
        this.component.props = v;
    }

    public get slot(): string {
        return this.component.slot;
    }
    public set slot(v: string) {
        this.component.slot = v;
    }

    public get key(): string | number {
        return this.component.key;
    }
    public set key(v: string | number) {
        this.component.key = v;
    }

    public get scopedSlots(): { [key: string]: ScopedSlot } {
        return this.component.scopedSlots;
    }
    public set scopedSlots(v: { [key: string]: ScopedSlot }) {
        this.component.scopedSlots = v;
    }

    public get ref(): string {
        return this.component.ref;
    }
    public set ref(v: string) {
        this.component.ref = v;
    }

    public get tag(): string {
        return this.component.tag;
    }
    public set tag(v: string) {
        this.component.tag = v;
    }

    public get staticClass(): string {
        return this.component.staticClass;
    }
    public set staticClass(v: string) {
        this.component.staticClass = v;
    }

    public get class(): any {
        return this.component.class;
    }
    public set class(v: any) {
        this.component.class = v;
    }

    public get staticStyle(): { [key: string]: any } {
        return this.component.staticStyle;
    }
    public set staticStyle(v: { [key: string]: any }) {
        this.component.staticStyle = v;
    }

    public get style(): object[] | object {
        return this.component.style;
    }
    public set style(v: object[] | object) {
        this.component.style = v;
    }

    public get attrs(): { [key: string]: any } {
        return this.component.attrs;
    }
    public set attrs(v: { [key: string]: any }) {
        this.component.attrs = v;
    }

    public get directives(): VNodeDirective[] {
        return this.component.directives;
    }
    public set directives(v: VNodeDirective[]) {
        this.component.directives = v;
    }

    constructor(name: string, factory: ComponentFactory);
    constructor(component: IComponentToRender, factory: ComponentFactory);
    constructor(nameOrComponent: string | IComponentToRender, protected factory: ComponentFactory) {
        if (typeof nameOrComponent === "string") {
            this.component = {
                name: nameOrComponent,
                children: []
            };
        } else if (nameOrComponent) {
            this.component = nameOrComponent;
            this.children = (nameOrComponent.children || [])
                .map((child) => factory.createComponentToRender(child));
        }
    }

    public render(createElement: CreateElement) {
        return createElement(this.name, this,
            this.children.map((child) => child.render(createElement)));
    }
}