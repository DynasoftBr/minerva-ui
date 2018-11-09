import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {

    @Prop({ default: "" })
    public headerText!: string;

    @Prop({ default: () => [] })
    public classes!: string[];

    @Prop({ default: true })
    public cardOutline!: boolean;

    public get cardClasses(): string[] {
        const actualClasses = ["card"];
        if (this.cardOutline)
            actualClasses.push("card-outline");

        return actualClasses.concat(this.classes);
    }

    protected render(h: any) {
        return (
            <div class={this.cardClasses}>
                {this.$slots.header &&
                    <div class="card-header">
                        {this.$slots.header}
                    </div>
                }
                <div class="card-body">
                    {this.$slots.default}
                </div>

                {this.$slots.footer &&
                    <div class="card-footer">
                        {this.$slots.footer}
                    </div>
                }
            </div>
        );
    }

    private initArray() {
        return [];
    }
}