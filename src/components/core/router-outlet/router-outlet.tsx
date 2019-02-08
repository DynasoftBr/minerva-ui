import { Component, Prop } from "vue-property-decorator";
import { IRoute } from "./models/iroute";
import Vue, { CreateElement, VueConstructor } from "vue";
import { Client } from "@poseidon/client";
import PageNotFound from "@/views/error-pages/page-not-found/page-not-found";
import DynamicView from "@/views/dynamic-view/dynamic-view";
import { ConcreteEntity } from "@poseidon/core-models";

export interface Props {
    routes: IRoute[];
}

@Component
export default class RouterOutlet extends Vue {

    @Prop({ default: () => [] })
    public routes: IRoute[];

    public pathname = window.location.pathname;

    private component: JSX.Element = null;

    protected created() {
        const pushState = history.pushState;

        // Override the push state method to dispatch an event when it's called
        history.pushState = (data: any, title: string, url?: string) => {
            pushState.apply(history, [data, title, url]);
            window.dispatchEvent(new Event("pushState"));
        };

        // Intercept browser history back and foward.
        window.addEventListener("popstate", () => {
            this.validateAndRedirect(window.location.pathname);
        });

        // Intercept pushState
        window.addEventListener("pushState", () => {
            this.validateAndRedirect(window.location.pathname);
        });

        this.validateAndRedirect(window.location.pathname);
    }

    protected render(createElement: CreateElement) {
        return this.component;
    }

    private async validateAndRedirect(pathname: string) {
        const paramsMatcher = /\/([^\/]+)\/?([^\/]+)?\/?$/ig;
        const result = paramsMatcher.exec(pathname);

        if (result && result[1]) {
            const etType = await Client.getEntityTypeByName(result[1]);

            if (!etType) {
                this.component = <PageNotFound />;
                return;
            }

            let entity: ConcreteEntity;
            if (result[2]) {
                entity = await Client.getById(result[1], result[2]);
            }

            this.component = <DynamicView entityType={etType} entity={entity} />;
        } else {
            this.component = <PageNotFound />;
        }
    }
}