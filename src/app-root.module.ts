export interface AppRootState {
    version: string;
    menuItems: any[];
}

export class AppRootModule {
    public static state: AppRootState = <any> {
        version: "2.0.0",
        menuItems: []
    };
}