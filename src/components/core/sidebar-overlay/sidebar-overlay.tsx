import { Component, Vue } from "vue-property-decorator";
import { MainSidebarModule } from "@/components/core/main-sidebar/main-sidebar.module";
import "./sidebar-overlay.scss";

@Component
export default class SidebarOverlay extends Vue {

    protected render(h: any) {
        return (
            <div id="sidebar-overlay" onClick={() => MainSidebarModule.toggle()} ></div>
        );
    }
}