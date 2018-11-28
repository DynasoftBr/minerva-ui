import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { ClickOutside } from "@/directives/click-outside";

@Component({
    directives: {
        clickOutsite: ClickOutside
    }
})
export default class DropdownMenu extends Vue {

    @Prop({ default: false })
    public show: boolean;

    @Prop()
    public width: string;

    private internalShow: boolean = false;
    protected mounted() {
        this.internalShow = this.show;
    }

    protected updated() {
        if (this.show != this.internalShow) {
            if (this.show)
                this.$emit("show");
            else
                this.$emit("hide");

            this.internalShow = this.show;
        }
    }

    protected render(h: any) {
        return (
            <div class={{ "dropdown-menu": true, "show": this.show }}
                style={{ width: this.width }}
                aria-labelledby="dropdown-menu" >
                {this.$slots.default}
            </div>
        );
    }

}