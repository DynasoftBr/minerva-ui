import { ComponentDecorator } from "./component-decorator";
import { CreateElement } from "vue";
import { ComponentToRender } from "../models/component-to-render";
import { DesignComponentFactory } from "../component-factory/design-component-factory";

export class PaletteDecorator extends ComponentDecorator {

    public get children(): ComponentToRender[] {
        const palette = this.factory.createComponentToRender({
            name: "sidebar-palette",
            props: {
                sidebarDarkTheme: false
            }
        });
        return [
            ...(super.children || []),
            palette
        ];
    }
    public set children(v: ComponentToRender[]) {
        super.children = v;
    }

    public render(createElement: CreateElement) {
        return createElement(this.name, this,
            this.children.map((child) => child.render(createElement)));
    }

}