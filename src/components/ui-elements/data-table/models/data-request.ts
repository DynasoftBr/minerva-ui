import { SortDefinition } from "@/components/ui-elements/data-table/models/sort-definition";
import { Column } from "@/components/ui-elements/data-table/models/column";
import { SortDirection } from "@/components/ui-elements/data-table/models/sort-order";

export class DataRequest {
    public take: number = 0;
    public skip: number = 0;
    public sort: SortDefinition[] = [];

    public addOrUpdateSortColum(col: string, dir: SortDirection) {
        // Try to find an existent sorted column.
        const sortedCol = this.sort.find((el) => el.col === col);

        // If found an existent column, just update the sort direction.
        if (sortedCol)
            sortedCol.dir = dir;
        else
            this.sort.push({ col, dir });
    }
}