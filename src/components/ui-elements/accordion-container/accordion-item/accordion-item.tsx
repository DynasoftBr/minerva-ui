import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import Heading from "../../heading/heading";
import Card from "../../card/card";
import "./accordion-item.scss";

@Component
export default class AccordionItem extends Vue {

    @Prop()
    public title: string;

    @Prop({ default: false })
    public initialShow: boolean;

    @Prop({ default: true })
    public noBottomMargin: boolean;

    @Prop({ default: false })
    public noPadding: boolean;

    private show: boolean = false;

    public toggle(): any {
        if (this.show) {
            this.show = false;
            this.$emit("hide", this);
        } else {
            this.show = true;
            this.$emit("show", this);
        }
    }

    protected mounted() {
        this.show = this.initialShow != null ? this.initialShow : this.show;
    }

    protected render(h: any) {
        return (
            <Card class="accordion-item" collapsed={!this.show}
                noBottomMargin={this.noBottomMargin}
                noPadding={this.noPadding}
                sm={true}>
                {this.title &&
                    <Heading slot="header" size={6} noMargin={true}>
                        <button type="button" class="btn btn-link" onClick={(e: Event) => this.toggle()}>
                            {this.title}
                        </button>
                    </Heading>
                }
                {this.$slots.default}
            </Card>
        );
    }
}