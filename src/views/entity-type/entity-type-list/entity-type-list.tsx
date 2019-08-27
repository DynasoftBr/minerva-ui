import DataTable from "@/components/ui-elements/data-table/data-table";

export class EntityTypeList {

    public loadData(request: any) {
        console.log(request);
        return [];
    }

    public render(h: any) {
        return <div>
            <DataTable
                loadDataFunc={(request: any) => this.loadData(request)}
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
        </div>
    }
}