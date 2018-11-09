export interface Column {
    display: string;
    dataField: string;
    sortable: boolean;
    sortDirection: "asc" | "desc";
    visible: boolean;
    colTemplate: string;
    cellTemplate: string;
}