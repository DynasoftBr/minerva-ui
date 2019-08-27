import { Component, Vue, Prop } from "vue-property-decorator";
import NavLink from "@/components/core/main-header/nav-link/nav-link";
import { MainSidebarModule } from "@/components/core/main-sidebar/main-sidebar.module";

@Component
export default class SideMenuToggle extends Vue {

    protected render(h: any) {
        return (
            <NavLink onClick={() => MainSidebarModmain-headerule.toggle()} hide-on-small-screen={false}>
                <i class="fa fa-bars"></i>
            </NavLink>
        );
    }
}