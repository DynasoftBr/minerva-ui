import { ComponentToRender } from "./component-to-render";
export interface Slots {
    [key: string]: ComponentToRender[];
}