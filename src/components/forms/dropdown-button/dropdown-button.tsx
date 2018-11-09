import { Component, Vue, Prop } from "vue-property-decorator";
import { ClickOutside } from "@/directives/click-outside";

@Component({
    directives: {
        clickOutsite: ClickOutside
    }
})
export default class DropdownButton extends Vue {
    @Prop({ default: "Select..." })
    public defaultValue: any;

    @Prop()
    public value: any;

    public isShown: boolean = false;

    public internalValue: any = "";

    public setValue(val: any) {
        this.internalValue = val;
        this.$emit("input", val);
    }

    public created() {
        this.internalValue = this.value;
    }

    public get formatedValue(): string {
        if (Array.isArray(this.internalValue) && this.internalValue.length > 0) {
            return this.internalValue.join(", ");
        } else if (!Array.isArray(this.internalValue) && this.internalValue != null)
            return this.internalValue;
        else
            return this.defaultValue;
    }

    protected render(h: any) {
        return (
            <div class={{ "dropdown": true, "show": this.isShown }}
                v-click-outside={() => this.isShown = false}>
                <button class="btn dropdown-toggle" type="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded={this.isShown}
                    onClick={(e: Event) => this.buttonClicked(e)}>
                    {this.formatedValue}
                </button>
                <div class={{ "dropdown-menu": true, "show": this.isShown }}
                    aria-labelledby="dropdownMenuButton">
                    {this.$slots.items}
                </div>
            </div>
        );
    }

    private buttonClicked(e: Event): any {
        e.stopPropagation();

        this.isShown = !this.isShown;
        if (this.isShown) {
            this.$emit("opened", e);
        } else {
            this.$emit("closed", e);
        }
    }
}