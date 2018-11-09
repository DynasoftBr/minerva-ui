import { Component, Prop, Vue } from "vue-property-decorator";
import TableHead from "@/components/ui-elements/data-table/table-head/table-head";
import TableBody from "@/components/ui-elements/data-table/table-body/table-body";
import TablePagination from "@/components/ui-elements/data-table/table-pagination/table-pagination";
import { Column } from "@/components/ui-elements/data-table/models/column";
import { DataRequest } from "@/components/ui-elements/data-table/models/data-request";
import { DataResponse } from "@/components/ui-elements/data-table/models/data-response";
import TableToolBar from "./table-toolbar/table-toolbar";

@Component
export default class DataTable extends Vue {

    @Prop({ default: 10 })
    public itemsPage: number;

    @Prop({ default: true })
    public tableHover: boolean;

    @Prop({ default: true })
    public striped: boolean;

    @Prop({ default: true })
    public tableBordered: boolean;

    @Prop({ default: false })
    public tableDark: boolean;

    @Prop({ default: true })
    public small: boolean;

    @Prop({ default: true })
    public fixedHead: boolean;

    @Prop()
    public columnsArray: Column[] | string[];

    @Prop()
    public tableId: string;

    @Prop({ default: false })
    public checkColumn: boolean;

    @Prop({ default: false })
    public showToolbar: boolean;

    @Prop()
    public loadDataFunc: (request: DataRequest) => Promise<DataResponse>;

    public checkColumnChecked: boolean = false;

    public dataRequest = new DataRequest();

    public totalItems: number = 0;

    public items: any[] = [];

    public get tableClasses(): object {
        return {
            "table": true, "table-sm": this.small, "table-hover": this.tableHover,
            "table-dark": this.tableDark, "table-striped": this.striped,
            "table-bordered": this.tableBordered
        };
    }

    public checkUncheckAll(check: boolean) {
        if (this.checkColumnChecked === check) return;
    }

    public mounted() {
        this.loadData();
    }

    public get tableHead(): TableHead {
        return this.$refs["table-head"] as TableHead;
    }

    protected render(h: any) {
        return (
            <div class="mi-table d-flex flex-row">
                {this.showToolbar && <TableToolBar />}
                <div class={{ "table-responsive": true, "table-fixed-head": this.fixedHead }}>
                    <table class={this.tableClasses}>

                        <TableHead
                            columns-array={this.columnsArray}
                            check-column={this.checkColumn}
                            check-column-checked={this.checkColumnChecked}
                            ref="table-head"
                            scopedSlots={this.$scopedSlots}
                            onColumnSort={(col, dir) => this.onColumnSort(col, dir)} />

                        <TableBody items={this.items} scopedSlots={this.$scopedSlots}
                            onDataNeeded={() => this.loadData()} />

                    </table>

                    <TablePagination totalItems={this.totalItems} itemsPage={this.itemsPage} />
                </div>
            </div>
        );
    }

    private onColumnSort(col: any, dir: any): any {
        this.dataRequest.addOrUpdateSortColum(col, dir);

        this.$emit("columnSort", col, dir);

        this.loadData();
    }

    private async loadData() {
        if (!this.loadDataFunc)
            return console.error("LoadDataFunc is undefined.");

        const response = await this.loadDataFunc(this.dataRequest);

        this.items = response.items;
        this.totalItems = response.total;
    }
}