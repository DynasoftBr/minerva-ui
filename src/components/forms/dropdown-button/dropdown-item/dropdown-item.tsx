import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DropdownItem extends Vue {

    @Prop({ default: false })
    public useButton: boolean;

    @Prop({ default: "#" })
    public href: string;

    @Prop({ default: false })
    public hasChild: boolean;

    @Prop({ default: false })
    public active: any;

    protected render(h: any) {
        if (this.hasChild) {
            return (
                <div>
                    <button class="dropdown-item has-child"
                        onClick={(e: Event) => this.itemClick(e)}>
                        {this.$slots.default}
                    </button>
                    <div class="dropdown-item-children">
                        {this.$slots.itemChildren}
                    </div>
                </div>
            );
        } else {
            if (this.useButton)
                return this.renderButton();
            else
                return this.renderA();
        }
    }

    private renderA() {
        return (
            <a class={{ "dropdown-item": true, active: this.active }}
                onClick={(e: Event) => this.itemClick(e)}
                href={this.href}>{this.$slots.default}</a>
        );
    }

    private renderButton() {
        return (
            <button class={{ "dropdown-item": true, active: this.active }}
                onClick={(e: Event) => this.itemClick(e)}>
                {this.$slots.default}</button>
        );
    }

    private itemClick(e: Event): any {
        e.stopPropagation();

        this.$emit("click", e);
    }
}