import { Component, Vue, Prop } from "vue-property-decorator";
import TableRow from "@/components/ui-elements/data-table/table-row/table-row";

@Component
export default class TableBody extends Vue {

    @Prop({ default: () => [] })
    public items: object[];

    protected render(h: any) {
        return (
            <tbody>
                {this.items.map((i) => {
                    return <TableRow rowItem={i} items={this.items} scopedSlots={this.$scopedSlots} />;
                })}
            </tbody>
        );
    }
}