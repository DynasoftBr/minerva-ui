import { Component, Vue, Prop } from "vue-property-decorator";
// import { Client } from "@poseidon/client";
import { EntityType, Entity } from "@poseidon/core-models";
import DataTable from "@/components/ui-elements/data-table/data-table";

import "./login.scss";

@Component
export default class ListEntityView extends Vue {

    @Prop()
    public entityType: EntityType;

    private entities: Entity[] = [];

    protected async beforeCreate() {
        try {
            // this.entities = await Client
            //     .getAll(this.entityType.name);
        } catch (error) { }
    }

    protected render() {
        return (
            <DataTable
                loadDataFunc={(request) => this.loadData(request)}
                columns-array={this.entityType.props.map((p) => {
                    return {
                        display: p.name, dataField: p.name
                    };
                })}>
            </DataTable>
        );
    }

    private loadData(request: any): Entity[] {
        return this.entities;
    }
}