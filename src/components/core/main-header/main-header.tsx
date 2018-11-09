import { Component, Vue } from "vue-property-decorator";
import NavLink from "@/components/core/main-header/nav-link/nav-link";
import NavBar from "@/components/core/main-header/navbar/navbar";
import NavSearchBar from "@/components/core/main-header/nav-search-bar/header-search-bar";
import NavDropdown from "@/components/core/main-header/nav-dropdown/nav-dropdown";
import ChatNotification from "@/components/core/main-header/dropdown-chat-notification/dropdown-chat-notification";
import NavDropdownDivider from "@/components/core/main-header/nav-dropdown-divider/nav-dropdown-divider";
import SideMenuToggle from "@/components/core/main-header/side-menu-toggle/side-menu-toggle";

@Component
export default class MainHeader extends Vue {

    public render(h: any) {
        return (
            <nav class="main-header navbar navbar-expand navbar-light border-bottom bg-white" >
                <NavBar flex-flow={true}>
                    <SideMenuToggle widget="pushmenu" toggle="main-sidebar"></SideMenuToggle>
                    <NavLink>Home</NavLink>
                    <NavSearchBar></NavSearchBar>
                </NavBar>
                <NavBar pull-right="true" ref="main">
                    <NavDropdown>
                        <i class="fa fa-comments" slot="link-text"></i>
                        <span class="badge badge-warning navbar-badge">15</span>
                        <template slot="dropdown-items">
                            <ChatNotification user-name="Leandro Albano"
                                date-time="2017-08-20" message="teste...">
                            </ChatNotification>
                            <NavDropdownDivider></NavDropdownDivider>
                        </template>
                    </NavDropdown>
                </NavBar>
            </nav>
        );
    }
}