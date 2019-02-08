import { Component, Prop, Vue } from "vue-property-decorator";
import SimpleListItem from "@/components/ui-elements/simple-list/simple-list-item/simple-list-item";

@Component
export default class PaletteItem extends Vue {

    @Prop()
    public title: string;

    protected render(h: any) {
        return (
            <div class="palette-item">
                <SimpleListItem>
                    {this.$props.title}
                    <div class="underline-component">
                        {this.$slots.default}
                    </div>
                </SimpleListItem>
            </div>
        );
    }
}