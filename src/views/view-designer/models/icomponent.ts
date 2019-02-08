import { ContainerDef } from "./container-def";
import { ICompoentProp } from "./icomponent-prop";
import { ComponentCategory } from "./component-category";

export interface IComponent {
    name: string;
    category?: ComponentCategory;
    paletteAvailable?: boolean;
    constainer?: ContainerDef;
    draggable?: boolean;
    props: ICompoentProp[];
}
