import { ComponentCategory } from "./enums/camponent-category";
import { ContainerDef } from "./conteiner-def";

export interface IComponent {
    name: string;
    category?: ComponentCategory;
    paletteAvailable?: boolean;
    constainer?: ContainerDef;
    draggable?: boolean;
    // props: ICompoentProp[];
}