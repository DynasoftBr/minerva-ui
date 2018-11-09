import { Component, Vue, Prop } from "vue-property-decorator";
import DataTable from "@/components/ui-elements/data-table/data-table";
import { Column } from "@/components/ui-elements/data-table/models/column";

@Component
export default class TableRow extends Vue {

    @Prop({ default: {} })
    public rowItem: object;

    @Prop({ default: () => [] })
    public items: object;

    public get dataTableComponent(): DataTable {
        return this.$parent.$parent as DataTable;
    }

    public get visibleColumns(): Column[] {
        return this.dataTableComponent.tableHead.visibleColumns.filter((i) => {
            return i.display;
        });
    }

    protected render(h: any) {
        return (
            <tr>
                {this.visibleColumns.map((i) => {
                    return <td>
                        {(this.$scopedSlots[i.cellTemplate] &&
                            this.$scopedSlots[i.cellTemplate]({
                                value: this.rowItem[i.dataField],
                                item: this.rowItem, array: this.items
                            })) || this.rowItem[i.dataField]}
                    </td>;
                })}
            </tr>
        );
    }

    private emitClick(e) {
        this.$emit("click");
    }

}