import { Component, Vue, Prop } from "vue-property-decorator";
import { TreeviewNode } from "../../models/treeview-node";
import Checkbox from "@/components/forms/checkbox/checkbox";
import { NodeCheckedChangedEvent } from "../../models/node-checked-changed-event";

@Component
export default class DropdownTreeviewItem extends Vue {

    @Prop({
        default: () => {
            return { open: false, selected: false, children: [], enabled: true, text: "", icon: "" };
        }
    })
    public node: TreeviewNode;

    @Prop({ default: false })
    public multiSelect: boolean;

    public internalNode = {
        open: false, selected: false,
        children: [], enabled: true, text: "", icon: ""
    } as TreeviewNode;

    public isIndeterminate = false;

    public created() {
        this.internalNode = this.node;
        if (this.internalNode.open == undefined) this.$set(this.internalNode, "open", false);
        if (this.internalNode.enabled == undefined) this.$set(this.internalNode, "enabled", false);
        if (this.internalNode.selected == undefined) this.$set(this.internalNode, "selected", false);

        this.internalNode.el = this;
    }

    public get hasChildren() {
        return this.node.children && this.node.children.length > 0;
    }

    public checkUncheck(val: boolean) {
        if (!this.hasChildren && this.internalNode.selected != val) {
            this.internalNode.selected = val;
            this.$emit("nodeCheckedChanged", { node: this.node, checked: val } as NodeCheckedChangedEvent);
        } else
            this.checkUncheckAll(val);
    }

    protected render(h: any) {
        if (this.hasChildren) {
            return (
                <li class={{
                    "treeview-node": true,
                    "has-children": this.hasChildren, "open": this.internalNode.open
                }}
                    onClick={(e: Event) => this.liClick(e)}>
                    {this.renderParentSpan(this.node)}
                    <ul class="treeview-node-children">
                        {this.internalNode.children.map((child) => <DropdownTreeviewItem node={child}
                            onNodeCheckedChanged={(val) => this.childCheckedChanged(val)}
                            multiSelect={this.multiSelect} />)}
                    </ul>
                </li>
            );
        } else {
            return (
                <li class="treeview-node" onClick={(e: Event) => this.liClick(e)}>
                    {this.renderSpan(this.node)}
                </li>
            );
        }
    }

    private renderSpan(node: TreeviewNode) {
        return (
            <span>
                <i class="fa" />
                <Checkbox class="node-check"
                    value={this.internalNode.selected || false}
                    onInput={(val) => this.checkUncheck(val)} />
                {this.node.icon && <i class={this.node.icon} />}
                {this.node.text}
            </span>
        );
    }

    private renderParentSpan(node: TreeviewNode) {
        return (
            <span>
                <i class="fa" />

                <Checkbox class="node-check" value={this.internalNode.selected || false}
                    onInput={(val) => this.checkUncheck(val)}
                    hasIndeterminate={true} v-indeterminate={this.isIndeterminate}
                    disabled={!this.multiSelect} />

                {this.node.icon && <i class={this.node.icon} />}
                {this.node.text}
            </span>
        );
    }

    private liClick(e: Event) {
        const target = e.target as HTMLElement;
        e.stopPropagation();

        if (target.getAttribute("type") == "checkbox") return;

        if (this.hasChildren)
            this.internalNode.open = !this.internalNode.open;
        else
            this.checkUncheck(!this.internalNode.selected);
    }

    private checkUncheckAll(value: boolean) {
        this.internalNode.selected = value;
        if (this.hasChildren) {
            this.$children.filter((el) => new RegExp("DropdownTreeviewItem$")
                .test(el.$vnode.tag)).forEach((el: DropdownTreeviewItem) => {
                    el.checkUncheck(value);
                });
        }
    }

    private childCheckedChanged(val: NodeCheckedChangedEvent) {
        const childrenSelectedLen = this.internalNode.children.filter((child) => child.selected).length;

        if (childrenSelectedLen == 0) {
            this.internalNode.selected = false;

            const anyIndeterminate = this.internalNode.children.find((c) => c.el.isIndeterminate) != null;

            this.isIndeterminate = anyIndeterminate;
        } else if (childrenSelectedLen == this.internalNode.children.length) {
            this.internalNode.selected = true;
            this.isIndeterminate = false;
        } else {
            this.internalNode.selected = false;
            this.isIndeterminate = true;
        }

        this.$emit("nodeCheckedChanged", val);
    }
}