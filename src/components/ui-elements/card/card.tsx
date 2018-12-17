import { Component, Prop, Vue } from "vue-property-decorator";
import "./card.scss";
import CollapsibleContent from "../accordion-container/collapsible-content/collapsible-content";

@Component
export default class Card extends Vue {

    @Prop({ default: true })
    public cardOutline!: boolean;

    @Prop({ default: false })
    public sm: boolean;

    @Prop({ default: false })
    public collapsed: boolean;

    @Prop({ default: false })
    public noBottomMargin: boolean;

    @Prop({ default: false })
    public noPadding: boolean;

    protected render(h: any) {
        return (
            <div class={{
                "card": true,
                "card-outline": this.cardOutline,
                "card-sm": this.sm,
                "card-no-mb": this.noBottomMargin,
                "card-no-p": this.noPadding
            }}>
                {this.$slots.header &&
                    <div class="card-header">
                        {this.$slots.header}
                    </div>
                }
                <CollapsibleContent show={!this.collapsed}>
                    <div class="card-body">
                        {this.$slots.default}
                    </div>
                </CollapsibleContent>

                {this.$slots.footer &&
                    <div class="card-footer">
                        {this.$slots.footer}
                    </div>
                }
            </div>
        );
    }
}