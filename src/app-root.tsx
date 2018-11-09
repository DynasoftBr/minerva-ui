import "./styles.scss";
import { Component, Vue, Prop } from "vue-property-decorator";
import MainHeader from "@/components/core/main-header/main-header";
import MainSidebar from "@/components/core/main-sidebar/main-sidebar";
import ContentWrapper from "@/components/core/content-wrapper/content-wrapper";
import MainFooter from "@/components/core/main-footer/main-footer";
import AlternativeSidebar from "@/components/core/alternative-sidebar/alternative-sidebar";
import SidebarOverlay from "@/components/core/sidebar-overlay/sidebar-overlay";
import { AppRootModule, AppRootState } from "@/app-root.module";
import { MainSidebarModule } from "@/components/core/main-sidebar/main-sidebar.module";

@Component
export default class AppRoot extends Vue {
    public sharedState: AppRootState = AppRootModule.state;

    public sidebarState = MainSidebarModule.state;

    public holdTransition: boolean = true;

    public fixedHeader: boolean = true;

    public sidebarMini: boolean = true;

    private Selector = {
        SIDEBAR: ".main-sidebar",
        HEADER: ".main-header",
        CONTENT: ".content-wrapper",
        CONTENT_HEADER: ".content-header",
        WRAPPER: ".wrapper",
        CONTROL_SIDEBAR: ".control-sidebar",
        LAYOUT_FIXED: ".layout-fixed",
        FOOTER: ".main-footer"
    };

    public mounted() {
        this.fixLayoutHeight();

        this.holdTransition = false;

        // attach events
        window.onresize = () => this.fixLayoutHeight();
    }

    protected render(h: any) {
        return (
            <div class={{
                "wrapper": true,
                "hold-transition": this.holdTransition,
                "sidebar-mini": this.sidebarMini,
                "sidebar-collapse": !this.sidebarState.isOpen,
                "fixed-header": false,
                "sidebar-open": this.sidebarState.isOpen,
                "d-flex": true,
                "flex-column": true
            }}>
                <MainHeader></MainHeader>
                <MainSidebar></MainSidebar>
                <SidebarOverlay></SidebarOverlay>
                <ContentWrapper title="Teste" sub-title="description"></ContentWrapper>
                <AlternativeSidebar></AlternativeSidebar>
                <MainFooter></MainFooter>
            </div>
        );
    }

    private fixLayoutHeight() {
        // const windowH = $(window).height();
        // const header = $(this.Selector.HEADER).outerHeight();
        // const footer = $(this.Selector.FOOTER).outerHeight();
        // const sidebar = $(this.Selector.SIDEBAR).height();

        // const heights = [windowH, header, footer, sidebar];

        // const max = Math.max(...heights) - header;

        // $(this.Selector.CONTENT).css("min-height", max);
        // $(this.Selector.SIDEBAR).css("min-height", max);
    }
}