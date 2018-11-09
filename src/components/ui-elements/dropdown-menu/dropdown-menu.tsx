import { Component, Vue, Prop } from "vue-property-decorator";
import { ClickOutside } from "@/directives/click-outside";

@Component({
    directives: {
        clickOutsite: ClickOutside
    }
})
export default class DropdownMenu extends Vue {

    public isShown: boolean = false;

    public show() {
        this.isShown = true;
    }

    public close() {
        this.isShown = false;
    }

    protected render(h: any) {
        return (
            <div class={{ "dropdown-menu": true, "show": this.isShown }}
                aria-labelledby="dropdown-menu">
                {this.$slots.default}
            </div>
        );
    }

}