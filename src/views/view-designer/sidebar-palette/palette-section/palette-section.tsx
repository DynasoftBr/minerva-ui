import { Component, Vue, Prop } from "vue-property-decorator";
import AccordionItem from "@/components/ui-elements/accordion-container/accordion-item/accordion-item";
import SimpleList from "@/components/ui-elements/simple-list/simple-list";

@Component
export default class PaletteSection extends Vue {

    @Prop()
    public title: string;

    protected render() {
        return (
            <AccordionItem title={this.title} noPadding={true}>
                <SimpleList>
                    {this.$slots.default}
                </SimpleList>
            </AccordionItem>
        );
    }
}