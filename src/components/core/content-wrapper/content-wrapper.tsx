import { Component, Vue, Prop } from "vue-property-decorator";
import ContentHeader from "@/components/core/content-wrapper/content-header/content-header";
import Card from "@/components/ui-elements/card/card";
import DataTable from "@/components/ui-elements/data-table/data-table";
import TableColumn from "@/components/ui-elements/data-table/table-column/table-column";
import { DataResponse } from "@/components/ui-elements/data-table/models/data-response";
import { DataRequest } from "@/components/ui-elements/data-table/models/data-request";
import DataFilter from "@/components/ui-elements/data-filter/data-filter";
import DateTimePicker from "@/components/forms/datetime-picker/datetime-picker";
import CustomSelect from "@/components/forms/minerva-select/minerva-select";

@Component
export default class ContentWrapper extends Vue {

    @Prop()
    public title!: string;

    @Prop()
    public subTitle!: string;

    protected render(h: any) {
        return (
            <div class="content-wrapper flex-fill">
                <ContentHeader sub-title={this.subTitle}>{this.title}</ContentHeader>
                <div class="content">
                    <div class="container-fluid">
                        <Card>
                            <CustomSelect></CustomSelect>
                            <DateTimePicker></DateTimePicker>
                            <DataFilter></DataFilter>
                            <DataTable
                                loadDataFunc={(request) => this.loadData(request)}
                                columns-array={[{
                                    display: "Column1", dataField: "column1",
                                    colTemplate: "col1Template",
                                    sortable: true
                                }, {
                                    display: "Column2", dataField: "column2",
                                    cellTemplate: "col2CellTemplate"
                                }]}
                                scopedSlots={{
                                    col1Template: (col) => <div>{col}<i class="fa fa-tachometer-alt"></i></div>,
                                    col2CellTemplate: (obj) => (<div>{obj.value}
                                        <i class="fa fa-tachometer-alt"></i></div>)
                                }}>

                            </DataTable>
                            {this.$slots.default}
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    private loadData(request: DataRequest): DataResponse {
        let items = [
            {
                column1: 1,
                column2: 2
            },
            {
                column1: 3,
                column2: 4
            }
        ];

        if (request.sort[0] && request.sort[0].dir == "asc") {
            if (request.sort[0] && request.sort[0].col == "column1") {
                items = items.sort((a, b) => a.column1 > b.column1 ? 1 : ((b.column1 > a.column1) ? -1 : 0));
            } else if (request.sort[0]) {
                items = items.sort((a, b) => a.column2 > b.column2 ? 1 : ((b.column2 > a.column2) ? -1 : 0));
            }
        } else if (request.sort[0]) {
            if (request.sort[0] && request.sort[0].col == "column1") {
                items = items.sort((a, b) => a.column1 < b.column1 ? 1 : ((b.column1 < a.column1) ? -1 : 0));
            } else if (request.sort[0]) {
                items = items.sort((a, b) => a.column2 < b.column2 ? 1 : ((b.column2 < a.column2) ? -1 : 0));
            }
        }
        return {
            items,
            total: 10
        };
    }
}