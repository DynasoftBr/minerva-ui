import { Component, Prop, Vue } from "vue-property-decorator";
import SimpleListItem from "@/components/ui-elements/simple-list/simple-list-item/simple-list-item";

@Component
export default class PaletteListItem extends Vue {

    @Prop()
    public component: string;

    protected render(h: any) {
        return (
            <div class="palette-list-item" data-component={JSON.stringify(this.component)}>
                <SimpleListItem>
                    {this.$slots.default}
                </SimpleListItem>
            </div>
        );
    }
}