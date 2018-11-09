import { Component, Vue, Prop } from "vue-property-decorator";
import { Column } from "@/components/ui-elements/data-table/models/column";

@Component
export default class TableColumn extends Vue {

    @Prop({ default: {} })
    public column!: Column;

    protected render(h: any) {
        if (this.column.visible === true || this.column.visible === undefined) {
            return (
                <th onClick={(e) => this.emitColumnSort(e)} class={{ sortable: this.column.sortable }}>
                    <div style={{ display: "inline-block" }}>{this.$slots.default || this.column.display}</div>
                    {this.column.sortable && this.column.sortDirection === "asc" &&
                        <i class="fa fa-angle-up sort-icon-asc"></i>

                        || this.column.sortable && this.column.sortDirection === "desc" &&
                        <i class="fa fa-angle-down sort-icon-desc"></i>
                    }
                </th>
            );
        }

        return;
    }

    private emitColumnSort(e: MouseEvent) {
        if (this.column.sortable) {
            this.column.sortDirection = this.column.sortDirection === "asc" ? "desc" : "asc";
            this.$emit("columnSort", this.column.dataField, this.column.sortDirection);
        }
    }
}