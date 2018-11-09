import { Component, Vue, Prop } from "vue-property-decorator";
import NavItem from "@/components/core/main-header/nav-item/nav-item";

@Component
export default class NavDropdown extends Vue {


    protected render(h: any) {
        return (
            <NavItem dropdown={true}>
                <a class="nav-link" data-toggle="dropdown" href="#">
                    {this.$slots["link-text"]}
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    {this.$slots["dropdown-items"]}
                </div>
            </NavItem>
        );
    }
}