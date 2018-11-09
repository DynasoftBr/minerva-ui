import { Component, Vue } from "vue-property-decorator";
import { SideMenuItemModel } from "@/components/core/main-sidebar/side-menu/models/side-menu-item.model";

@Component
export default class SidebarMenu extends Vue {

    public sideMenuItems: SideMenuItemModel[] = [];

    private height: number = 0;

    public mounted() {
        this.height = (this.$refs.nav as any).clientHeight;

        window.addEventListener("resize", () => {
            this.height = (this.$refs.nav as any).clientHeight;
        });
    }

    protected render(h: any) {
        return (
            <nav class="mt-2 teste" style={{
                height: (this.height ? this.height : null) + "px"
            }} ref="nav" v-bar>
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview"
                    role="menu" data-accordion="false">
                    {this.$slots.default}
                </ul>
            </nav>
        );
    }
}