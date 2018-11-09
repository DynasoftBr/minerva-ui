export interface AppRootState {
    version: string;
    menuItems: [];
}

export class AppRootModule {
    public static state: AppRootState = {
        version: "2.0.0",
        menuItems: []
    };
}