import { ComponentDecorator } from "./component-decorator";
import { ComponentToRender } from "../models/component-to-render";

export class PaletteDecorator extends ComponentDecorator {
    public buildData() {
        const data = super.buildData();
        data.children.push(this.paletteComponent);
        data.children.push(this.propertiesComponent);

        return data;
    }

    private get paletteComponent(): ComponentToRender {
        return this.factory.createComponent({
            name: "sidebar-palette",
            ref: "palette",
            props: { sidebarDarkTheme: false },
            children: [
                {
                    name: "palette-section",
                    props: { title: "Form components" },
                    children: [
                        {
                            name: "palette-item",
                            props: { title: "Input text" },
                            children: [
                                { name: "input-text" }
                            ]
                        }
                    ]
                },
                {
                    name: "palette-section",
                    props: { title: "General elements" },
                    children: [
                        {
                            name: "palette-item",
                            props: { title: "Grid row" },
                            children: [
                                {
                                    name: "grid-row",
                                    children: [
                                        { name: "grid-col" },
                                        { name: "grid-col" },
                                        { name: "grid-col" }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }

    private get propertiesComponent(): ComponentToRender {
        return this.factory.createComponent({
            name: "sidebar-properties",
            props: { sidebarDarkTheme: false }
        });
    }
}