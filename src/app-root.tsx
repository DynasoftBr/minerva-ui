import { Component, Vue } from "vue-property-decorator";
import { AppRootModule, AppRootState } from "@/app-root.module";
import { MainSidebarModule } from "@/components/core/main-sidebar/main-sidebar.module";
import routes from "./routes";
import RouterOutlet from "./components/core/router-outlet/router-outlet";

@Component
export default class AppRoot extends Vue {
    public sharedState: AppRootState = AppRootModule.state;

    public sidebarState = MainSidebarModule.state;

    public holdTransition: boolean = true;

    public fixedHeader: boolean = true;

    public sidebarMini: boolean = true;

    protected render() {
        return (
            <RouterOutlet routes={routes}></RouterOutlet>
        );
    }
}