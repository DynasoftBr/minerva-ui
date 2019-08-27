import { Component, Vue, Prop } from "vue-property-decorator";
import DataTable from "@/components/ui-elements/data-table/data-table";
import { DataResponse } from "@/components/ui-elements/data-table/models/data-response";
import { DataRequest } from "@/components/ui-elements/data-table/models/data-request";
import DataFilter from "@/components/ui-elements/data-filter/data-filter";
import DateTimePicker from "@/components/forms/datetime-picker/datetime-picker";
import CustomSelect from "@/components/forms/minerva-select/minerva-select";
import ContentWrapper from "@/components/core/content-wrapper/content-wrapper";

@Component
export default class TestView extends Vue {
  protected render(h: any) {
    return (
      <ContentWrapper title="teste">
        <CustomSelect />
        <DateTimePicker />
        <DataFilter />
        <DataTable
          loadDataFunc={request => this.loadData(request)}
          columns-array={[
            {
              display: "Column1",
              dataField: "column1",
              colTemplate: "col1Template",
              sortable: true
            },
            {
              display: "Column2",
              dataField: "column2",
              cellTemplate: "col2CellTemplate"
            }
          ]}
          scopedSlots={{
            col1Template: col => (
              <div>
                {col}
                <i class="fa fa-tachometer-alt" />
              </div>
            ),
            col2CellTemplate: obj => (
              <div>
                {obj.value}
                <i class="fa fa-tachometer-alt" />
              </div>
            )
          }}
        />
      </ContentWrapper>
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
        items = items.sort((a, b) =>
          a.column1 > b.column1 ? 1 : b.column1 > a.column1 ? -1 : 0
        );
      } else if (request.sort[0]) {
        items = items.sort((a, b) =>
          a.column2 > b.column2 ? 1 : b.column2 > a.column2 ? -1 : 0
        );
      }
    } else if (request.sort[0]) {
      if (request.sort[0] && request.sort[0].col == "column1") {
        items = items.sort((a, b) =>
          a.column1 < b.column1 ? 1 : b.column1 < a.column1 ? -1 : 0
        );
      } else if (request.sort[0]) {
        items = items.sort((a, b) =>
          a.column2 < b.column2 ? 1 : b.column2 < a.column2 ? -1 : 0
        );
      }
    }
    return {
      items,
      total: 10
    };
  }
}
