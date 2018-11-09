import { SortDirection } from "@/components/ui-elements/data-table/models/sort-order";

export interface SortDefinition {
    col: string;
    dir: SortDirection;
}