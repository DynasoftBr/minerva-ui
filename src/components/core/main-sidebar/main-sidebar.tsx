import { Component, Vue, Prop } from "vue-property-decorator";
import BrandLink from "@/components/core/main-sidebar/brand-link/brand-link";
import SidebarUserPanel from "@/components/core/main-sidebar/user-panel/sidebar-user-panel";
import SidebarMenu from "@/components/core/main-sidebar/side-menu/sidebar-menu";
import SidebarMenuItem from "@/components/core/main-sidebar/side-menu-item/sidebar-menu-item";

@Component
export default class MainSidebar extends Vue {

    @Prop()
    public brandLogo!: string;

    @Prop()
    public brandText!: string;

    @Prop()
    public logoAltText!: string;

    @Prop({ default: "#" })
    public href!: string;

    protected render(h: any) {
        return (
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <BrandLink brand-logo={this.brandLogo} brand-text={this.brandText}
                    logo-alt-text={this.logoAltText} href={this.href}></BrandLink>

                <div class="sidebar">
                    <SidebarUserPanel user-name={"Leandro Albano"}></SidebarUserPanel>
                    <SidebarMenu>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>
                        <SidebarMenuItem has-child={true} icon-class="fa-dashboard">
                            Dashboard
                            <template slot="children-items">
                                <SidebarMenuItem>teste</SidebarMenuItem>
                            </template>
                        </SidebarMenuItem>

                    </SidebarMenu>
                </div>
            </aside>
        );
    }
}