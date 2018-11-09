import { TreeviewNode } from "./treeview-node";

export interface NodeCheckedChangedEvent {
    node: TreeviewNode;
    checked: boolean;
}