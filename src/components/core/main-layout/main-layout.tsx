import "../../../styles.scss";
import { Component, Vue, Prop } from "vue-property-decorator";
import MainHeader from "@/components/core/main-header/main-header";
import MainSidebar from "@/components/core/main-sidebar/main-sidebar";
import MainFooter from "@/components/core/main-footer/main-footer";
import ControlSidebar from "@/components/core/control-sidebar/control-sidebar";
import SidebarOverlay from "@/components/core/sidebar-overlay/sidebar-overlay";
import { AppRootModule, AppRootState } from "@/app-root.module";
import { MainSidebarModule } from "@/components/core/main-sidebar/main-sidebar.module";

@Component
export default class MainLayout extends Vue {
    public sharedState: AppRootState = AppRootModule.state;

    public sidebarState = MainSidebarModule.state;

    public holdTransition: boolean = true;

    public fixedHeader: boolean = true;

    public sidebarMini: boolean = true;

    protected render(h: any) {
        return (
            <div class={{
                "wrapper": true,
                "hold-transition": this.holdTransition,
                "sidebar-mini": this.sidebarMini,
                "sidebar-collapse": !this.sidebarState.isOpen,
                "fixed-header": false,
                "sidebar-open": this.sidebarState.isOpen
            }}>
                <MainHeader></MainHeader>
                <MainSidebar></MainSidebar>
                <SidebarOverlay></SidebarOverlay>

                {this.$slots.default}

                <MainFooter></MainFooter>
            </div>
        );
    }
}