import { VNodeData } from "vue";

export interface IComponentToRender extends VNodeData {
    name: string;
    children?: IComponentToRender[];
}
