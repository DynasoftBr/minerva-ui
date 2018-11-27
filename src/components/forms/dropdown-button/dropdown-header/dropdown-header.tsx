import { Component, Vue, Prop } from "vue-property-decorator";
import "./dropdown-header.scss";

@Component
export default class DropdownHeader extends Vue {

    @Prop({ default: false })
    public headerSmall: boolean;

    protected render(h: any) {
        return (
            <div class={{
                "dropdown-header": true,
                "header-small": this.headerSmall
            }}>
                {this.$slots.default}
            </div>
        );
    }
}