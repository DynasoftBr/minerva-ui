import { Component, Vue, Prop } from "vue-property-decorator";
import NavItem from "@/components/core/main-header/nav-item/nav-item";

@Component
export default class NavLink extends Vue {

    @Prop()
    public widget!: string;

    @Prop({ default: "#" })
    public href!: string;

    @Prop()
    public toggle!: string;

    @Prop({ default: true })
    public hideOnSmallScreen: boolean;

    protected render(h: any) {
        return (
            <NavItem hide-on-small-screen={this.hideOnSmallScreen}>
                <a class="nav-link" data-widget={this.widget} href={this.href} data-toggle={this.toggle}
                    onClick={(e: any) => this.$emit("click")}>
                    {this.$slots.default}
                </a>
            </NavItem >
        );
    }
}