import { IComponent } from "./models/icomponent";
import { ComponentPropertyTypes } from "./models/icomponent-prop";
import { ComponentCategory } from "./models/component-category";

const components: IComponent[] = [
    {
        name: "grid-row",
        draggable: true,
        category: ComponentCategory.layout,
        paletteAvailable: true,
        constainer: {
            flow: "row",
            allowed: ["grid", "col"],
            max: 12
        },
        props: [
            {
                name: "noGutters",
                validation: {
                    type: ComponentPropertyTypes.number
                }
            }
        ]
    },
    {
        name: "grid-col",
        category: ComponentCategory.layout,
        paletteAvailable: true,
        draggable: true,
        constainer: { flow: "col" },
        props: [
            {
                name: "size",
                validation: {
                    type: ComponentPropertyTypes.number,
                    max: 12
                }
            }
        ]
    },
    {
        name: "input-text",
        category: ComponentCategory.formElements,
        paletteAvailable: true,
        draggable: true,
        props: [
            {
                name: "readonly",
                validation: {
                    type: ComponentPropertyTypes.boolean
                }
            }, {
                name: "disabled",
                validation: {
                    type: ComponentPropertyTypes.boolean
                }
            }, {
                name: "value",
                validation: {
                    type: ComponentPropertyTypes.string
                }
            }, {
                name: "placeholder",
                validation: {
                    type: ComponentPropertyTypes.string
                }
            }, {
                name: "label",
                validation: {
                    type: ComponentPropertyTypes.string
                }
            }, {
                name: "tabIndex",
                validation: {
                    type: ComponentPropertyTypes.number
                }
            }, {
                name: "autoComplete",
                validation: {
                    type: ComponentPropertyTypes.boolean
                }
            }, {
                name: "autoCapitalize",
                validation: {
                    type: ComponentPropertyTypes.boolean
                }
            }, {
                name: "spellCheck",
                validation: {
                    type: ComponentPropertyTypes.boolean
                }
            }, {
                name: "size",
                validation: {
                    type: ComponentPropertyTypes.enum,
                    enum: ["s", "m", "l"]
                }
            }
        ]
    },
    {
        name: "content-wrapper",
        props: []
    },
    {
        name: "content-container",
        props: []
    },
    {
        name: "sidebar-palette",
        props: []
    },
    {
        name: "palette-section",
        props: [
            {
                name: "title",
                validation: {
                    type: ComponentPropertyTypes.string
                }
            }
        ]
    },
    {
        name: "palette-item",
        props: [
            {
                name: "title",
                validation: {
                    type: ComponentPropertyTypes.string
                }
            }
        ]
    }
];