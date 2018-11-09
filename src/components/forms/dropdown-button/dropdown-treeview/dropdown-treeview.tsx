import { Component, Vue, Prop } from "vue-property-decorator";
import { TreeviewNode } from "../models/treeview-node";
import DropdownTreeviewItem from "./dropdown-treeview-item/dropdown-treeview-item";
import { NodeCheckedChangedEvent } from "../models/node-checked-changed-event";
import DropdownButton from "../dropdown-button";
import "./dropdown-treeview.scss";

@Component
export default class DropdownTreeview extends Vue {

    @Prop({ default: () => [] })
    public nodes: TreeviewNode[];

    @Prop({ default: true })
    public multiSelect: boolean;

    @Prop({ default: false })
    public searchEnabled: boolean;

    public internalNodes: TreeviewNode[] = [];

    private selectedNodes: TreeviewNode[] = [];

    public mounted() {
        this.internalNodes.push(...this.nodes);

        if (this.searchEnabled) {
            this.$parent.$on("opened", () => {
                setTimeout(() => {
                    const el = this.$refs["searchbox"] as HTMLElement;

                    el.focus();
                }, 3);

            });
        }
    }

    protected render(h: any) {
        return (
            <ul class="dropdown-tree">
                {this.searchEnabled && this.renderSearchBox()}
                {this.internalNodes.map((node) => {
                    return <DropdownTreeviewItem node={node}
                        onNodeCheckedChanged={(val) => this.nodeCheckedChanged(val)}
                        multiSelect={this.multiSelect} />;
                })}
            </ul>
        );
    }

    private renderSearchBox() {
        return (
            <li style={{ "padding-left": "5px", "padding-right": "5px" }}>
                <input type="text" style={{ width: "100%", "padding-left": "5px" }}
                    placeholder="search"
                    ref="searchbox" />
            </li>
        );
    }

    private nodeCheckedChanged(val: NodeCheckedChangedEvent): any {
        if (val.checked && !this.multiSelect && this.selectedNodes.length) {
            this.selectedNodes[0].el.checkUncheck(false);
            this.selectedNodes.splice(0, 1);
        }

        if (val.checked)
            this.selectedNodes.push(val.node);
        else {
            const idx = this.selectedNodes.indexOf(val.node);
            this.selectedNodes.splice(idx, 1);
        }

        const parent = this.$parent as DropdownButton;
        if (this.multiSelect) {
            parent.setValue(this.selectedNodes.map((el) => el.value || el.text));
        } else {
            const selected = this.selectedNodes[0];
            if (selected) {
                parent.setValue(selected.value || selected.text);
                parent.isShown = false;
            } else {
                parent.setValue(null);
            }

        }
    }
}