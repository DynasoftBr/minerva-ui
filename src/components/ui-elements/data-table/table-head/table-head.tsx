import { Component, Prop, Vue } from "vue-property-decorator";
import TableColumn from "../table-column/table-column";
import { Column } from "../models/column";
import Checkbox from "@/components/forms/checkbox/checkbox";
import { SortDirection } from "@/components/ui-elements/data-table/models/sort-order";

@Component
export default class TableHead extends Vue {

    @Prop({ default: false })
    public checkColumn: boolean;

    @Prop({ default: false })
    public checkColumnChecked: boolean;

    @Prop()
    public columnsArray: string[] | Column[];

    @Prop()
    public tableId: string;

    public get columns(): Column[] {
        if (this.columnsArray && this.columnsArray.length > 0) {
            if (typeof (this.columnsArray[0]) === "string") {
                return (this.columnsArray as string[]).map((i) => {
                    return { display: i, visible: true, dataField: i } as Column;
                });
            }
        }

        return this.columnsArray as Column[];
    }

    public checkColumnChanged(val) {
        this.$emit("checkColumnChanged", val);
    }

    public get visibleColumns(): Column[] {
        return this.columns.filter((col) => col.display);
    }

    protected render(h: any) {
        return (
            <thead>
                <tr>
                    {/* If checkcolumn is true add the checkbox */}
                    {this.checkColumn &&
                        <th>
                            <Checkbox value={this.checkColumnChecked}
                                onInput={(val) => this.checkColumnChanged(val)} />
                        </th>
                    }
                    {
                        this.visibleColumns.map((col) => {
                            return <TableColumn
                                column={col}
                                onColumnSort={(column, dir) => this.onColumnSort(column, dir)}>

                                {this.$scopedSlots[col.colTemplate] &&
                                    this.$scopedSlots[col.colTemplate](col.display)
                                }
                            </TableColumn>;
                        })
                    }
                </tr>
            </thead>
        );
    }

    private onColumnSort(col: string, dir: SortDirection) {
        this.$emit("columnSort", col, dir);
    }
}