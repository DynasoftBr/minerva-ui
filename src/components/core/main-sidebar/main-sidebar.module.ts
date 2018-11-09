export interface MainSidebarState {
    screenCollapseSize: number;
    isOpen: boolean;
}

export class MainSidebarModule {
    public static state: MainSidebarState = {
        screenCollapseSize: 768,
        isOpen: false
    };

    public static toggle() {
        this.state.isOpen = !this.state.isOpen;
    }
}