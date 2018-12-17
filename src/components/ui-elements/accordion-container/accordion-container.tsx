import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import AccordionItem from "./accordion-item/accordion-item";

@Component
export default class AccordionContainer extends Vue {

    @Prop({ default: false })
    public allowMultipleOpen: boolean;

    private children: Vue[] = [];

    private openedItems: AccordionItem[] = [];

    protected created() {
        this.children = this.$children;
    }

    protected render(h: any) {
        return (
            <div class="accordion-container">
                {this.children.map((item: AccordionItem, idx: number) => {
                    item.$off("show");
                    item.$off("hide");
                    item.$on("show", (comp: AccordionItem) => this.onShowItem(comp));
                    item.$on("hide", (comp: AccordionItem) => this.onHideItem(comp));
                })}
                {this.$slots.default}
            </div>
        );
    }

    private onShowItem(comp: AccordionItem): any {
        if (!this.allowMultipleOpen && this.openedItems.length > 0) {
            const opened = this.openedItems[0];
            opened.toggle();
        }

        this.openedItems.push(comp);
    }

    private onHideItem(comp: AccordionItem): any {
        const idx = this.openedItems.indexOf(comp);
        this.openedItems.splice(idx, 1);
    }
}